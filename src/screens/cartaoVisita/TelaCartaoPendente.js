
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


// import components
import {Heading6} from '../../components/text/CustomText';

// import colors
import Colors from '../../theme/colors';

import firebase from '../../config/firebase'; 

//import gradient
import  { LinearGradient } from 'expo-linear-gradient';


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
    color: 'white'
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

export default class TelaCartaoPendente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartoesEstab: [],
      cartoesAuto:[],
      statusVerified: false
    };
  }






  async componentDidMount() {
    let e = this;
    let currentUserUID = firebase.auth().currentUser.uid;

    await firebase.firestore().collection(`usuarios/${currentUserUID}/cartoes`).where("type", "==", "Autonomo").where("verifiedPublish", "==", false).onSnapshot(documentSnapshot => {
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
  
      await firebase.firestore().collection(`usuarios/${currentUserUID}/cartoes`).where("type", "==", "Estabelecimento").where("verifiedPublish", "==", false).onSnapshot(documentSnapshot => {
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


  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };


  deletePublish(itemToBeDeleted) {
    let userUID = firebase.auth().currentUser.uid;
    Alert.alert(
      'Atenção!!!',
      'Você tem certeza que quer deletar este anúncio?',
      [
        {text: 'Não', onPress: () => {}},
          {text: 'Sim', onPress: () => firebase.firestore().collection('usuarios').doc(userUID).collection('cartoes').where("idCartao", "==", itemToBeDeleted).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc){
              doc.ref.delete();
            })
          })}
      ]
    )
  }



  render() {
    const {cartoesEstab, cartoesAuto} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>

        <LinearGradient
          // Background Linear Gradient
          colors={['#00b970', '#00b9a7', '#00b9a7']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        />

        <StatusBar
          backgroundColor={'#00b970'}
          barStyle="white-content"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
                <FontAwesome5 onPress={() => this.goBack()} style={{color:'white'}} name="arrow-left" size={20}/>                
                <Heading6 style={styles.titleText}>Anúncios Pendentes</Heading6>
              </View>
            </View>


                  {cartoesEstab.length == 0 && cartoesAuto.length == 0 &&
                    <View style={{flex:1, alignItems:'center', paddingTop:"50%"}}>
                      <View>
                        <Image style={{width:200, height:200, marginLeft:30}} source={require("../../assets/img/notfoundnoback.gif")} />
                        <Text style={{fontWeight:'bold', color:'white'}}>Nenhum Cartão Pendente Foi Encontrado</Text>
                      </View>
                    </View>
                  }


                  <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                    <FlatList
                        keyExtractor={() => this.makeid(17)}
                        data={cartoesAuto}
                        renderItem={({item}) => 
                            <View style={{width: 336, height: 180, marginBottom:5, marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2, }}>
                              <View style={{flexDirection:'row'}}>
                                  <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                  
                                  <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:15, color:'#70AD66'}}>{item.nome}</Text>

                                    {this.cutDescription(item.description)}

                                    <View style={{flexDirection:'row', paddingHorizontal:'15%'}}>
                                      <Text style={{paddingTop:10, color: '#70AD66', fontSize:12}}>{item.categoria}</Text>
                                      <FontAwesome5 style={{marginLeft:15, marginTop:10}} name="clone" size={19} color={'#70AD66'} />
                                    </View>
                                  </View>
                              </View>  

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('MostrarCartao', {idDoCartao: item.idCartao, phoneNumberNavigator: item.phone, idUserCartao: item.idUser})} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                      <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EditarCartao', {idCartao: item.idCartao, type: item.type})} style={{marginTop: 24, marginRight: 10}}>
                                      <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={() => this.deletePublish(item.idCartao)} style={{marginTop: 24, marginRight: 10}}>
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
                        data={cartoesEstab}
                        renderItem={({item}) => 
                            <View style={{width: 336, height: 180, marginBottom:5, marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                              <View style={{flexDirection:'row'}}>
                                  <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                  
                                  <View style={{flexDirection:'column', }}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:15, color:'#70AD66'}}>{item.title}</Text>

                                    {this.cutDescription(item.description)}

                                    <View style={{flexDirection:'row', paddingHorizontal:45}}>
                                      <Text style={{paddingTop:10, color: '#70AD66', fontSize:12}}>{item.categoria}</Text>
                                      <FontAwesome5 style={{marginLeft:15, marginTop:10}} name="clone" size={19} color={'#70AD66'} />
                                    </View>
                                  </View>
                              </View>  

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('MostrarCartao', {idDoCartao: item.idCartao, phoneNumberNavigator: item.phone})} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                      <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EditarCartao', {idCartao: item.idCartao, type: item.type})} style={{marginTop: 24, marginRight: 10}}>
                                      <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={() => this.deletePublish(item.idCartao)} style={{marginTop: 24, marginRight: 10}}>
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
