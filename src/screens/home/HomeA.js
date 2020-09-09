
// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  AsyncStorage,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Color from 'color';

import {Heading6} from '../../components/text/CustomText';


// import colors
import Colors from '../../theme/colors';


//import firebase 
import firebase from '../../config/firebase';



//import icons
import { FontAwesome5 } from '@expo/vector-icons';

//CSS responsivo
import { SafeBackground, IconResponsive, AnuncioContainer, Description, IconResponsiveNOBACK, Heading, Title, ValueField, TouchableDetails, TextDetails, SignUpBottom, TextBold, TextBoldGolden } from './styles';

import ShimmerPlaceholder  from 'react-native-shimmer-placeholder';

import { ThemeContext } from '../../../ThemeContext';


//import ADS
import { AdMobBanner} from 'expo-ads-admob';

// HomeA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  titleText: {
    fontWeight: '700',
  },
  viewAllText: {
    color: Colors.primaryColor,
  },
  categoriesList: {
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 8,
  },
  cardImg: {borderRadius: 4},
  card: {
    marginLeft: 8,
    width: 104,
    height: 72,
    resizeMode: 'cover',
  },
  cardOverlay: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Color(Colors.overlayColor).alpha(0.2),
    overflow: 'hidden',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardTitle: {
    padding: 12,
    fontWeight: '500',
    fontSize: 16,
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  productsList: {
    paddingBottom: 16,
    // spacing = paddingHorizontal + ActionProductCard margin = 12 + 4 = 16
    paddingHorizontal: 12,
  },
  popularProductsList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
});


export default class HomeA extends Component {
  static contextType = ThemeContext

  constructor(props) {
    super(props);

    this.state = {
      verified:false,
      status: null,
      emailUserFunction:'',
      activesPublishesAuto: [],
      activesPublishesEstab: [],
      isFetched: false,
      isFetchedPublish: false,
      isFetchedButton: false,
      scrollY: 0
    };
  }



  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };



    //sleep function
    sleep = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    }



async componentDidMount() {
  const darkVar = this.context

  console.log('DARK CONTEXT: ' + darkVar)
  console.reportErrorsAsExceptions = false; 


   let e = this;

    await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          e.setState({status: true})
          firebase.firestore().collection('usuarios').doc(user.uid).onSnapshot(documentSnapshot => {
            var removeCharacters = documentSnapshot.data().email.replace('@', '')
              let removeCharacters2 = removeCharacters.replace('gmail.com', '')
              let removeCharacters3 = removeCharacters2.replace('hotmail.com', '')
              let removeCharacters4 = removeCharacters3.replace('outlook.com', '')
              let removeCharacters5 = removeCharacters4.replace('live.com', '')
              let removeCharacters6 = removeCharacters5.replace('yahoo.com', '')

              e.setState({emailUserFunction: removeCharacters6})
              e.setState({isFetchedButton: true})

        })
        } else {
          e.setState({isFetchedButton: true})
          e.setState({status: false})
        }

    })


    //obter anuncios ativos autonomo 
    await firebase.firestore().collection('anuncios').where("type", "==", "Autonomo").where("verifiedPublish", "==", true).onSnapshot(documentSnapshot => {
      let anunciosAtivosAuto = [];
      documentSnapshot.forEach(function(doc) {
        anunciosAtivosAuto.push({
          idUser: doc.data().idUser,
          nome: doc.data().nome,
          idAnuncio: doc.data().idAnuncio,
          photo: doc.data().photoPublish,
          title: doc.data().titleAuto,
          description: doc.data().descriptionAuto,
          type: doc.data().type,
          phone: doc.data().phoneNumberAuto,
          verified: doc.data().verifiedPublish,
          value: doc.data().valueServiceAuto
        })
      })


      e.setState({activesPublishesAuto: anunciosAtivosAuto})

      this.sleep(1000).then(() => { 
      e.setState({isFetchedPublish: true})
      })
    })


    //obter anuncios ativos estabelecimento
    await firebase.firestore().collection('anuncios').where("type", "==", "Estabelecimento").where("verifiedPublish", "==", true).onSnapshot(documentSnapshot => {
      let anunciosAtivosEstab = [];
      documentSnapshot.forEach(function(doc) {
        anunciosAtivosEstab.push({
          idUser: doc.data().idUser,
          idAnuncio: doc.data().idAnuncio,
          photo: doc.data().photoPublish,
          title: doc.data().titleEstab,
          description: doc.data().descriptionEstab,
          phone: doc.data().phoneNumberEstab,
          type: doc.data().type,
          verified: doc.data().verifiedPublish,
          value: doc.data().valueServiceEstab
        })
      })


      e.setState({activesPublishesEstab: anunciosAtivosEstab})

      this.sleep(1000).then(() => { 
        e.setState({isFetchedPublish: true})
      })
    })





   let nomeUser = '';
   let emailUser = '';
   let senhaUser = '';
   let telefoneUser = '';
   let dataNascimentoUser = '';


    AsyncStorage.getItem('verified').then((value) => {
      if(value == 'true') {
        AsyncStorage.setItem('verified', JSON.stringify(true))
      }

      if(value == 'false') {
         AsyncStorage.getItem('nome').then((value) =>{nomeUser = value})
         AsyncStorage.getItem('email').then((value) =>{emailUser = value})
         AsyncStorage.getItem('senha').then((value) =>{senhaUser = value})
         AsyncStorage.getItem('telefone').then((value) =>{telefoneUser = value})
         AsyncStorage.getItem('dataNascimento').then((value) =>{dataNascimentoUser = value})

        this.props.navigation.navigate('EmailVerificacao', {
            nome: nomeUser,
            email: emailUser,
            senha: senhaUser,
            telefone: telefoneUser,
            dataNascimento: dataNascimentoUser
        })
        alert('Você ainda não confirmou o email!')
      }

      if(value == 'undefined' || value == 'null') {
        return null;
      }
      console.log('VALOR DO ASYNC STORAGE: ' + value)
    })





  }


  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }



  cutDescription(text) {
    if(text.length > 40) {
      let shortDescription = text.substr(0, 40)

      return(
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          <Description>{shortDescription} ...</Description>
        </View>
      );
    } else {
      return(
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          <Description>{text}</Description>
        </View>
      );
    }
  }
  
 

  render() {
    const { status, emailUserFunction, isFetchedButton, isFetchedPublish, activesPublishesAuto, activesPublishesEstab, isFetched } = this.state

    return (
      <SafeBackground>

        <StatusBar
          backgroundColor={this.context.dark ? '#121212' : 'white'}
          barStyle={this.context.dark ? "white-content" : "dark-content"}
        />
        
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
              
                {status == true ? 
                  <View>
                    <ShimmerPlaceholder visible={isFetchedButton} shimmerColors={['#DAA520', '#FFD700', '#FFD700']} style={{borderRadius:5, justifyContent:'center', width:210, height:27}}>
                      <TouchableOpacity onPress={this.navigateTo('Settings')} style={{borderRadius:5, justifyContent:'center', width:216, height:27}}>
                          <TextBoldGolden>Olá, {emailUserFunction}</TextBoldGolden>
                      </TouchableOpacity>
                    </ShimmerPlaceholder>
                    </View>
                    :
                    <ShimmerPlaceholder visible={isFetchedButton} shimmerColors={['#DAA520', '#FFD700', '#FFD700']} style={{borderRadius:5 ,alignItems: 'center', justifyContent: 'center', width:116, height:27}}>
                      <SignUpBottom onPress={this.navigateTo('SignUp')}>
                          <TextBold>Criar Conta</TextBold>
                      </SignUpBottom>
                    </ShimmerPlaceholder>
                }
                    
                <TouchableOpacity onPress={this.navigateTo('Filtro')} style={{width:20, height:20}}>
                    <IconResponsiveNOBACK  name="sort-alpha-up" size={19}/>
                </TouchableOpacity>
              </View>

            

            </View>

            <View style={styles.titleContainer}>
              <Heading>Anúncios</Heading>
            </View>

            <AdMobBanner
              style={{marginLeft: 20}}
              bannerSize="leaderboard"
              adUnitID="ca-app-pub-3940256099942544/6300978111"
              setTestDeviceIDAsync
              servePersonalizedAds
              onDidFailToReceiveAdWithError={(err) => console.log(err)} 
            /> 

              <FlatList 
                keyExtractor={() => this.makeid(17)}
                data={activesPublishesAuto}
                renderItem={({item}) =>
                
                
                <View style={{flex:1, alignItems: 'center'}}>
                      <View>
                        <ShimmerPlaceholder visible={isFetchedPublish} shimmerColors={['#DAA520', '#FFD700', '#FFD700']} style={{width: 336, height: 170,  marginBottom:5,  marginTop: 10,  borderRadius: 10}}>
                          <AnuncioContainer>
                              <View style={{flexDirection:'row'}}>
                                  <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                  
                                  <View style={{flexDirection:'column'}}>
                                      <Title>{item.title}</Title>
                                      {this.cutDescription(item.description)}
                                  </View>
                              </View>  

                              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <TouchableDetails onPress={() => this.props.navigation.navigate('TelaAnuncio', {idDoAnuncio: item.idAnuncio, phoneNumberNavigator: item.phone, idUserCartao: item.idUser, nomeToZap: item.nome})}>
                                      <TextDetails>Ver Detalhes</TextDetails>
                                  </TouchableDetails>

                                  <View style={{marginTop: 24}}>
                                      <ValueField>{item.value}</ValueField>
                                  </View>

                                  <View style={{marginTop: 24, marginRight: 30}}>
                                      <IconResponsive  name="user-tie" size={19}/>
                                  </View>
                              </View> 

                          </AnuncioContainer>
                        </ShimmerPlaceholder>
                      </View>

                  </View>
                
              }
              >
              </FlatList>

              <AdMobBanner
                style={{marginLeft: 20}}
                bannerSize="leaderboard"
                adUnitID="ca-app-pub-3940256099942544/6300978111"
                setTestDeviceIDAsync
                servePersonalizedAds
                onDidFailToReceiveAdWithError={(err) => console.log(err)} 
              /> 

              <FlatList 
                keyExtractor={() => this.makeid(17)}
                data={activesPublishesEstab}
                renderItem={({item}) =>
                
                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                      <ShimmerPlaceholder visible={isFetchedPublish} shimmerColors={['#DAA520', '#FFD700', '#FFD700']} style={{width: 336, height: 170,  marginBottom:5,  marginTop: 10,  borderRadius: 10, elevation:15,  shadowColor: 'black', shadowOffset:{width:2, height:2},  shadowOpacity: 0.2}}>
                        <AnuncioContainer>
                            <View style={{flexDirection:'row'}}>
                                <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                
                                <View style={{flexDirection:'column'}}>
                                    <Title>{item.title}</Title>
                                    {this.cutDescription(item.description)}
                                </View>
                            </View>  

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableDetails onPress={() => this.props.navigation.navigate('TelaAnuncio', {idDoAnuncio: item.idAnuncio, phoneNumberNavigator: item.phone, idUserCartao: item.idUser})}>
                                    <TextDetails>Ver Detalhes</TextDetails>
                                </TouchableDetails>


                                <View style={{marginTop: 24}}>
                                      <ValueField>{item.value}</ValueField>
                                </View>

                                <View style={{marginTop: 24, marginRight: 30}}>
                                    <IconResponsive  name="briefcase" size={19}/>
                                </View>
                            </View> 

                        </AnuncioContainer>
                      </ShimmerPlaceholder>
                    </View>
                </View>
                
              }
              >
              </FlatList>

              <AdMobBanner
                style={{marginLeft: 20}}
                bannerSize="leaderboard"
                adUnitID="ca-app-pub-3940256099942544/6300978111"
                setTestDeviceIDAsync
                servePersonalizedAds
                onDidFailToReceiveAdWithError={(err) => console.log(err)} 
              /> 
          </ScrollView>
        </View>
      </SafeBackground>
    );
  }
}
