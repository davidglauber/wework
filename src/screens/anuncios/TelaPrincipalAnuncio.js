
// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
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

import firebase from '../../config/firebase'; 


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

export default class TelaPrincipalAnuncio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anunciosEstab: [],
      anunciosAuto:[],
    };
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





  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };


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

 
  render() {
    const {anunciosEstab, anunciosAuto} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
                <View style={styles.titleContainer}>
                  <Heading6 style={styles.titleText}>Ativos</Heading6>
                </View>

                <TouchableOpacity onPress={this.navigateTo('Orders')} style={{marginRight:5, borderRadius:25, alignItems:'center', justifyContent:'center', width:40, height:40, backgroundColor: "#70AD66"}}>
                        <FontAwesome5  name="plus" size={19} color={"#fff"} />
                </TouchableOpacity>

                <TouchableOpacity onPress={this.navigateTo('TelaAnunciosPendentes')} style={{marginRight:5, borderRadius:5, alignItems:'center', justifyContent:'center', width:116, height:27, backgroundColor: "#e3e3e3"}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Pendentes</Text>
                </TouchableOpacity>
              </View>


            </View>

                {anunciosEstab.length == 0 && anunciosAuto.length == 0 &&
                    <View style={{flex:1, alignItems:'center', paddingTop:"50%"}}>
                        <View>
                          <Image style={{width:200, height:200, marginLeft:20}} source={require("../../assets/img/notfound.gif")} />
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
                            <View style={{width: 336, height: 170, marginBottom:5, marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                              <View style={{flexDirection:'row'}}>
                                  <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                  
                                  <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:25, color:'#70AD66'}}>{item.title}</Text>

                                    {this.cutDescription(item.description)}
                                  </View>
                              </View>  

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('TelaAnuncio', {idDoAnuncio: item.idAnuncio, phoneNumberNavigator: item.phone})} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                      <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EditarAnuncio', {idAnuncio: item.idAnuncio, type: item.type})} style={{marginTop: 24, marginRight: 10}}>
                                      <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={() => this.deletePublish(item.idAnuncio)} style={{marginTop: 24, marginRight: 10}}>
                                      <FontAwesome5  name="trash" size={19} color={"grey"} />
                                  </TouchableOpacity>

                                  <View style={{marginTop: 24, marginRight: 30}}>
                                      <FontAwesome5  name="user-tie" size={19} color={"#70AD66"} />
                                </View>
                              </View> 

                            </View>
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
                            <View style={{width: 336, height: 170, marginBottom:5,marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                    
                                    <View style={{flexDirection:'column'}}>
                                        <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:10, color:'#70AD66'}}>{item.title}</Text>
                                      
                                        {this.cutDescription(item.description)}
                                    </View>
                                </View>  

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('TelaAnuncio', {idDoAnuncio: item.idAnuncio, phoneNumberNavigator: item.phone})} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                        <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditarAnuncio', {idAnuncio: item.idAnuncio, type: item.type})} style={{marginTop: 24, marginRight: 10}}>
                                        <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.deletePublish(item.idAnuncio)} style={{marginTop: 24, marginRight: 10}}>
                                        <FontAwesome5  name="trash" size={19} color={"grey"} />
                                    </TouchableOpacity>
                                    
                                    <View style={{marginTop: 24, marginRight: 30}}>
                                        <FontAwesome5  name="briefcase" size={19} color={"#70AD66"} />
                                    </View>
                                </View> 

                            </View>
                        }
                      />
                    </View>
                  </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
