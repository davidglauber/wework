
// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Color from 'color';

import firebase from '../../config/firebase';

// import colors
import Colors from '../../theme/colors';

//import gradient
import  { LinearGradient } from 'expo-linear-gradient';

//import icons
import { FontAwesome5 } from '@expo/vector-icons';


import { SafeBackground, Title, AnuncioContainer, PlusContainer, PlusIcon, TouchableDetails, ValueField, TextDetails, IconResponsive, Heading } from '../home/styles';

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

export default class TelaGeralCriarCartao extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartoesEstab: [],
      cartoesAuto: []
    };
  }

  //sleep function
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }



  async componentDidMount() {
    let e = this;
    let currentUserUID = firebase.auth().currentUser.uid;

    await firebase.firestore().collection(`usuarios/${currentUserUID}/cartoes`).where("type", "==", "Autonomo").where("verifiedPublish", "==", true).onSnapshot(documentSnapshot => {
      let cartoesAutoDidMount = []
      documentSnapshot.forEach(function(doc) {
        cartoesAutoDidMount.push({
          idUser: doc.data().idUser,
          nome: doc.data().nome,
          idCartao: doc.data().idCartao,
          photo: doc.data().photoPublish,
          description: doc.data().descriptionAuto,
          type: doc.data().type,
          categoria: doc.data().categoryAuto,
          phone: doc.data().phoneNumberAuto,
        })
      })
      e.setState({cartoesAuto: cartoesAutoDidMount})
    })

    await firebase.firestore().collection(`usuarios/${currentUserUID}/cartoes`).where("type", "==", "Estabelecimento").where("verifiedPublish", "==", true).onSnapshot(documentSnapshot => {
      let cartoesEstabDidMount = []
      documentSnapshot.forEach(function(doc) {
        cartoesEstabDidMount.push({
          idUser: doc.data().idUser,
          idCartao: doc.data().idCartao,
          photo: doc.data().photoPublish,
          local: doc.data().localEstab,
          title: doc.data().titleEstab,
          description: doc.data().descriptionEstab,
          phone: doc.data().phoneNumberEstab,
          timeOpen: doc.data().timeOpen,
          timeClose: doc.data().timeClose,
          type: doc.data().type,
          verified: doc.data().verifiedPublish,
          categoria: doc.data().categoryEstab,
          workDays: doc.data().workDays
        })
      })
      e.setState({cartoesEstab: cartoesEstabDidMount})
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


  deletePublishOfMainRoute(itemToBeDeletedFunction){
    let userUID = firebase.auth().currentUser.uid;
      firebase.firestore().collection('usuarios').doc(userUID).collection('cartoes').where("idCartao", "==", itemToBeDeletedFunction).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
          doc.ref.delete();
      })
    })

    firebase.firestore().collection('cartoes').where("idAnuncio", "==", itemToBeDeletedFunction).get().then(function(querySnapshot) {
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


  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };


  waitQueryToShowNotFoundGIF() {
    if(this.state.cartoesAuto.length == 0 && this.state.cartoesEstab.length == 0) {
        return( 
          <View style={{flex:1, alignItems:'center', paddingTop:"50%"}}>
            <View>
              <Image style={{width:200, height:200, marginLeft:20}} source={require("../../assets/img/notfoundnoback.gif")} />
              <Text style={{fontWeight:'bold', color:'white'}}>Nenhum Cartão Ativo Foi Encontrado</Text>
            </View>
          </View>
        );
    }
  }
 
  render() {
    const {cartoesAuto, cartoesEstab} = this.state;

    return (
      <SafeBackground>
        <StatusBar
          backgroundColor={"white"}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
                    <Heading style={{marginLeft: 30, marginRight: 34}}>Ativos</Heading>

                <PlusContainer onPress={this.navigateTo('TelaCriarCartaoVisita')}>
                        <PlusIcon  name="plus" size={19}/>
                </PlusContainer>

                <TouchableOpacity onPress={this.navigateTo('TelaCartaoPendente')} style={{marginRight:5, borderRadius:5, alignItems:'center', justifyContent:'center', width:116, height:27}}>
                    <Heading>Pendentes</Heading>
                </TouchableOpacity>
              </View>


            </View>

                {this.waitQueryToShowNotFoundGIF()}


                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                    <FlatList
                        keyExtractor={() => this.makeid(17)}
                        data={cartoesAuto}
                        renderItem={({item}) => 
                            <AnuncioContainer style={{height: 190}}>
                              <View style={{flexDirection:'row'}}>
                                  <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                  
                                  <View style={{flexDirection:'column'}}>
                                    <Title>{item.nome}</Title>

                                    {this.cutDescription(item.description)}

                                    <View style={{flexDirection:'row', paddingHorizontal:'15%'}}>
                                      <ValueField style={{paddingTop:10, fontSize:12}}>{item.categoria}</ValueField>
                                      <IconResponsive style={{marginLeft:15, marginTop:10}} name="clone" size={19} />
                                    </View>
                                  </View>
                              </View>  

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <TouchableDetails onPress={() => this.props.navigation.navigate('MostrarCartao', {idDoCartao: item.idCartao, phoneNumberNavigator: item.phone, idUserCartao: item.idUser})}>
                                      <TextDetails>Ver Detalhes</TextDetails>
                                  </TouchableDetails>

                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EditarCartao', {idCartao: item.idCartao, type: item.type})} style={{marginTop: 24, marginRight: 10}}>
                                      <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={() => this.deletePublish(item.idCartao)} style={{marginTop: 24, marginRight: 10}}>
                                      <FontAwesome5  name="trash" size={19} color={"grey"} />
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
                        data={cartoesEstab}
                        renderItem={({item}) => 
                            <AnuncioContainer style={{height: 190}}>
                              <View style={{flexDirection:'row'}}>
                                  <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                  
                                  <View style={{flexDirection:'column', }}>
                                    <Title>{item.title}</Title>

                                    {this.cutDescription(item.description)}

                                    <View style={{flexDirection:'row', paddingHorizontal:65}}>
                                      <ValueField style={{paddingTop:10, fontSize:12}}>{item.categoria}</ValueField>
                                      <IconResponsive style={{marginLeft:15, marginTop:10}} name="clone" size={19}/>
                                    </View>
                                  </View>
                              </View>  

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <TouchableDetails onPress={() => this.props.navigation.navigate('MostrarCartao', {idDoCartao: item.idCartao, phoneNumberNavigator: item.phone, idUserCartao: item.idUser})}>
                                      <TextDetails>Ver Detalhes</TextDetails>
                                  </TouchableDetails>

                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EditarCartao', {idCartao: item.idCartao, type: item.type})} style={{marginTop: 24, marginRight: 10}}>
                                      <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={() => this.deletePublish(item.idCartao)} style={{marginTop: 24, marginRight: 10}}>
                                      <FontAwesome5  name="trash" size={19} color={"grey"} />
                                  </TouchableOpacity>

                                  <View style={{marginTop: 24, marginRight: 30}}>
                                      <IconResponsive  name="briefcase" size={19} />
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
