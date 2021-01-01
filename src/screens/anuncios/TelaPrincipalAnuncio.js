
// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Modal,
  Dimensions,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Color from 'color';



// import colors
import Colors from '../../theme/colors';

import firebase from '../../config/firebase'; 

import { PulseIndicator } from 'react-native-indicators';


import { SafeBackground, Title, AnuncioContainer, PlusContainer, PlusIcon, Description, IconResponsiveNOBACK, TouchableDetails, TextDetails, IconResponsive, Heading } from '../home/styles';


//RESPONSIVE FONT 
import { RFValue } from 'react-native-responsive-fontsize';

import { ThemeContext } from '../../../ThemeContext';

//consts
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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
    marginRight:30
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
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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

export default class TelaPrincipalAnuncio extends Component {
  static contextType = ThemeContext


  constructor(props) {
    super(props);

    this.state = {
      anunciosEstab: [],
      anunciosAuto:[],
      isFetchedPublish: false,
      modalVisible: true
    };
  }



  //sleep function
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


  async componentDidMount() {
    let e = this;
    let currentUserUID = firebase.auth().currentUser.uid;

    await firebase.firestore().collection(`usuarios/${currentUserUID}/anuncios`).where("type", "==", "Autonomo").where("verifiedPublish", "==", true).onSnapshot(documentSnapshot => {
      let anunciosAutoDidMount = []
      documentSnapshot.forEach(function(doc) {
        anunciosAutoDidMount.push({
          idUser: doc.data().idUser,
          nome: doc.data().nome,
          idAnuncio: doc.data().idAnuncio,
          photo: doc.data().photoPublish,
          title: doc.data().titleAuto,
          description: doc.data().descriptionAuto,
          type: doc.data().type,
          phone: doc.data().phoneNumberAuto,
          verified: doc.data().verifiedPublish
        })
      })
      e.setState({anunciosAuto: anunciosAutoDidMount})
      this.setModalVisible(false)

      this.sleep(1000).then(() => { 
        e.setState({isFetchedPublish: true})
      })
    })

    await firebase.firestore().collection(`usuarios/${currentUserUID}/anuncios`).where("type", "==", "Estabelecimento").where("verifiedPublish", "==", true).onSnapshot(documentSnapshot => {
      let anunciosEstabDidMount = []
      documentSnapshot.forEach(function(doc) {
        anunciosEstabDidMount.push({
          idUser: doc.data().idUser,
          idAnuncio: doc.data().idAnuncio,
          photo: doc.data().photoPublish,
          title: doc.data().titleEstab,
          description: doc.data().descriptionEstab,
          phone: doc.data().phoneNumberEstab,
          type: doc.data().type,
          verified: doc.data().verifiedPublish
        })
      })
      e.setState({anunciosEstab: anunciosEstabDidMount})
      this.setModalVisible(false)

      this.sleep(1000).then(() => { 
        e.setState({isFetchedPublish: true})
      })
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

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };


  verifyNumberOfPublises() {
    let currentUserUID = firebase.auth().currentUser.uid;

    firebase.firestore().collection(`usuarios/${currentUserUID}/anuncios`).where("verifiedPublish", "==", true).get().then(documentSnapshot => {
      let anunciosDidMount = []
      documentSnapshot.forEach(function(doc) {
        anunciosDidMount.push({
          idUser: doc.data().idUser,
          nome: doc.data().nome,
          idAnuncio: doc.data().idAnuncio,
          photo: doc.data().photoPublish,
          title: doc.data().titleAuto,
          description: doc.data().descriptionAuto,
          type: doc.data().type,
          phone: doc.data().phoneNumberAuto,
          verified: doc.data().verifiedPublish
        })
      })
      

      if(anunciosDidMount.length  <= 1) {
        this.props.navigation.navigate('Orders')
      }

      if(anunciosDidMount.length >= 2) {
        alert('A conta Free permite até 2 anúncios, consulte a tela de PLANOS para mais informações')
      }

      console.log('TAMANHO DA LISTA DE ANUNCIOS:> ' + anunciosDidMount)
    })

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

  deletePublishOfMainRoute(itemToBeDeletedFunction){
    let userUID = firebase.auth().currentUser.uid;
    firebase.firestore().collection('usuarios').doc(userUID).collection('anuncios').where("idAnuncio", "==", itemToBeDeletedFunction).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        doc.ref.delete();
      })
    })

    firebase.firestore().collection('anuncios').where("idAnuncio", "==", itemToBeDeletedFunction).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        doc.ref.delete();
      })
    })
  }


  deletePublish(itemToBeDeleted) {
    let userUID = firebase.auth().currentUser.uid;
    Alert.alert(
      'Atenção!!!',
      'Você tem certeza que quer deletar este anúncio?',
      [
        {text: 'Não', onPress: () => {}},
        {text: 'Sim', onPress: () => this.deletePublishOfMainRoute(itemToBeDeleted)}
      ]
    )
  }


  responsibleFont() {
    let Height = Dimensions.get('window').height

    return RFValue(15, Height);
  }


 
  render() {
    const {anunciosEstab, anunciosAuto, isFetchedPublish} = this.state;

    return (
      <SafeBackground>
        <StatusBar
          backgroundColor={this.context.dark ? '#121212' : 'white'}
          barStyle={this.context.dark ? "white-content" : "dark-content"}
        />

        <View style={styles.container}>

          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
            <View style={{flex:1, alignItems:'center', paddingLeft: windowWidth / 2, paddingTop: windowHeight / 2, width: 100}}>
              <View style={{alignItems:'center', borderWidth:2, borderColor:'black', backgroundColor:'white', height:100, width: 200, backgroundColor:'white', borderRadius:15}}>
                <Text style={{fontWeight:'bold', marginTop:10, color:'#9A9A9A'}}>Carregando...</Text>
                <PulseIndicator color='#DAA520'/>
              </View>
            </View>
          </Modal>
          
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
                <View style={styles.titleContainer}>
                  <Heading style={styles.titleText}>Anúncios Ativos</Heading>
                </View>

                <PlusContainer onPress={() => this.verifyNumberOfPublises()}>
                    <PlusIcon  name="plus" size={19}/>
                </PlusContainer>

              </View>


            </View>

                {anunciosEstab.length == 0 && anunciosAuto.length == 0 &&
                    <View style={{flex:1, alignItems:'center', paddingTop: 75}}>
                        <View>
                          <Image style={{width:200, height:200, marginLeft:20}} source={require("../../assets/img/notfoundnoback.gif")} />
                          <Text style={{fontWeight:'bold'}}>Nenhum Anúncio Ativo Foi Encontrado</Text>
                        </View>
                    </View>
                }



                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                      <FlatList
                        keyExtractor={() => this.makeid(17)}
                        data={anunciosAuto}
                        renderItem={({item}) => 
                            <AnuncioContainer>
                              <View style={{flexDirection:'row'}}>
                                  <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                  
                                  <View style={{flexDirection:'column'}}>
                                    <Title style={{fontSize: this.responsibleFont()}}>{item.title}</Title>

                                    {this.cutDescription(item.description)}
                                  </View>
                              </View>  

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <TouchableDetails onPress={() => this.props.navigation.navigate('TelaAnuncio', {idDoAnuncio: item.idAnuncio, phoneNumberNavigator: item.phone, idUserCartao: item.idUser, nomeToZap: item.nome})}>
                                      <TextDetails>Ver Detalhes</TextDetails>
                                  </TouchableDetails>

                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EditarAnuncio', {idAnuncio: item.idAnuncio, type: item.type})} style={{marginTop: 24, marginRight: 10}}>
                                      <IconResponsive  name="pencil-alt" size={19}/>
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={() => this.deletePublish(item.idAnuncio)} style={{marginTop: 24, marginRight: 10}}>
                                      <IconResponsive  name="trash" size={19}/>
                                  </TouchableOpacity>

                                  <View style={{marginTop: 24, marginRight: 30}}>
                                      <IconResponsive  name="user-tie" size={19}/>
                                </View>
                              </View> 

                            </AnuncioContainer>
                        }
                      />
                    </View>
                </View>

                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                      <FlatList
                        keyExtractor={() => this.makeid(17)}
                        data={anunciosEstab}
                        renderItem={({item}) => 
                            <AnuncioContainer>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                    
                                    <View style={{flexDirection:'column'}}>
                                        <Title style={{fontSize: this.responsibleFont()}}>{item.title}</Title>
                                      
                                        {this.cutDescription(item.description)}
                                    </View>
                                </View>  

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TouchableDetails onPress={() => this.props.navigation.navigate('TelaAnuncio', {idDoAnuncio: item.idAnuncio, phoneNumberNavigator: item.phone, idUserCartao: item.idUser})}>
                                        <TextDetails>Ver Detalhes</TextDetails>
                                    </TouchableDetails>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditarAnuncio', {idAnuncio: item.idAnuncio, type: item.type})} style={{marginTop: 24, marginRight: 10}}>
                                        <IconResponsive  name="pencil-alt" size={19} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.deletePublish(item.idAnuncio)} style={{marginTop: 24, marginRight: 10}}>
                                        <IconResponsive  name="trash" size={19} />
                                    </TouchableOpacity>
                                    
                                    <View style={{marginTop: 24, marginRight: 30}}>
                                        <IconResponsive  name="briefcase" size={19}/>
                                    </View>
                                </View> 

                            </AnuncioContainer>
                        }
                      />
                    </View>
                  </View>
          </ScrollView>
        </View>
      </SafeBackground>
    );
  }
}
