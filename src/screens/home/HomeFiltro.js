
// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  AsyncStorage,
  View,
  TouchableOpacity,
} from 'react-native';
import Color from 'color';

import {Heading6} from '../../components/text/CustomText';

// import colors
import Colors from '../../theme/colors';


//import firebase 
import firebase from '../../config/firebase';

// HomeA Config
const imgHolder = require('../../assets/img/imgholder.png');


//Import images
const fotoAnuncio = require('../../assets/img/confeiteira.jpeg');
const fotoAnuncioEst = require('../../assets/img/traducao.jpg')


//CSS responsivo
import { SafeBackground, IconResponsive, AnuncioContainer, Heading, Title, ValueField, TouchableDetails, TextDetails, SignUpBottom, TextBold, TextBoldGolden } from './styles';

import { ThemeContext } from '../../../ThemeContext';

//import icons
import { FontAwesome5 } from '@expo/vector-icons';

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

export default class HomeFiltro extends Component {
  static contextType = ThemeContext

  constructor(props) {
    super(props);

    this.state = {
      verified:false,
      status: null,
      emailUserFunction:'',
      activesPublishesAuto: [],
      activesPublishesEstab: []
    };
  }



  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };






async componentDidMount() {
  console.reportErrorsAsExceptions = false;
    let arrayOfSelectedCategories = this.props.route.params.categoriasFiltradas;
    let typeRoute = this.props.route.params.type;

    console.log('ARRAY RECEBIDO DO NAVIGATOR: ' + arrayOfSelectedCategories)
    console.log('type RECEBIDO DO NAVIGATOR: ' + typeRoute)

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


        })
        } else {
          e.setState({status: false})
        }

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



    if(arrayOfSelectedCategories.length == 0) {
        this.props.navigation.navigate('HomeNavigator')
    }

    //Pegando lista de categorias selecionadas
    for(var i = 0; i < arrayOfSelectedCategories.length; i++) {
        console.log('Elementos: ' + arrayOfSelectedCategories)

        if(typeRoute == 'Autonomo') {
          firebase.firestore().collection('anuncios').where("type", "==", typeRoute).where("verifiedPublish", "==", true).where("categoryAuto", "in", arrayOfSelectedCategories).onSnapshot(documentSnapshot => {
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
            })
        }

        
        if(typeRoute == 'Estabelecimento') {
          //obter anuncios ativos estabelecimento
          await firebase.firestore().collection('anuncios').where("type", "==", typeRoute).where("verifiedPublish", "==", true).where("categoryEstab", "in", arrayOfSelectedCategories).onSnapshot(documentSnapshot => {
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
        })
        }


    }

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
          <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>{shortDescription} ...</Text>
        </View>
      );
    } else {
      return(
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>{text}</Text>
        </View>
      );
    }
  }

  render() {
    const { status, emailUserFunction, activesPublishesAuto, activesPublishesEstab } = this.state

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
                    <TouchableOpacity onPress={this.navigateTo('Settings')} style={{borderRadius:5, justifyContent:'center', width:216, height:27}}>
                        <TextBoldGolden>Olá, {emailUserFunction}</TextBoldGolden>
                    </TouchableOpacity>
                    :
                    <SignUpBottom onPress={this.navigateTo('SignUp')}>
                        <TextBold>Criar Conta</TextBold>
                    </SignUpBottom>
                }
                    
                <TouchableOpacity onPress={this.navigateTo('Filtro')} style={{width:20, height:20}}>
                    <IconResponsive  name="sort-alpha-up" size={19}/>
                </TouchableOpacity>
              </View>

            

            </View>

            <View style={styles.titleContainer}>
              <Heading>Anúncios</Heading>
            </View>
              
              <FlatList 
                keyExtractor={() => this.makeid(17)}
                data={activesPublishesAuto}
                renderItem={({item}) =>
                
                  <View style={{flex:1, alignItems: 'center'}}>
                      <View>
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
                                      <IconResponsive  name="user-tie" size={19}/>
                                  </View>
                              </View> 

                          </AnuncioContainer>
                      </View>
                  </View>
                
                }
              >
              </FlatList>


              <FlatList 
                keyExtractor={() => this.makeid(17)}
                data={activesPublishesEstab}
                renderItem={({item}) =>
                
                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
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
                    </View>
                </View>
                
                }
              >
              </FlatList>

          </ScrollView>
        </View>
      </SafeBackground>
    );
  }
}
