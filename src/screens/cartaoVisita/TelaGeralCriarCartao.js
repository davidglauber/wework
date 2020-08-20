
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

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import ActionProductCard from '../../components/cards/ActionProductCard';
//import ActionProductCardHorizontal from '../../components/cards/ActionProductCardHorizontal';
import LinkButton from '../../components/buttons/LinkButton';
import {Heading6} from '../../components/text/CustomText';

import firebase from '../../config/firebase';

import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

//import gradient
import  { LinearGradient } from 'expo-linear-gradient';

// HomeA Config
const imgHolder = require('../../assets/img/imgholder.png');


//Import images
const fotoAnuncio = require('../../assets/img/confeiteira.jpeg');
const fotoAnuncioEst = require('../../assets/img/traducao.jpg')


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

export default class TelaGeralCriarCartao extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartoesEstab: [],
      cartoesAuto: [],
      categories: [
        {
          key: 1,
          imageUri: require('../../assets/img/pizza_3.jpg'),
          name: 'Pizza',
        },
        {
          key: 2,
          imageUri: require('../../assets/img/meat_1.jpg'),
          name: 'Grill',
        },
        {
          key: 3,
          imageUri: require('../../assets/img/spaghetti_2.jpg'),
          name: 'Pasta',
        },
        {
          key: 4,
          imageUri: require('../../assets/img/soup_1.jpg'),
          name: 'Soups',
        },
        {
          key: 5,
          imageUri: require('../../assets/img/salad_1.jpg'),
          name: 'Salads',
        },
      ],
      products: [
        {
          imageUri: require('../../assets/img/pizza_4.png'),
          name: 'Pizza Carbonara 35cm',
          price: 10.99,
          label: 'new',
        },
        {
          imageUri: require('../../assets/img/sandwich_1.png'),
          name: 'Breakfast toast sandwich',
          price: 4.99,
        },
        {
          imageUri: require('../../assets/img/cake_3.png'),
          name: 'Cake Cherries Pie',
          price: 8.49,
          discountPercentage: 10,
        },
        {
          imageUri: require('../../assets/img/soup_2.png'),
          name: 'Broccoli Soup',
          price: 6.49,
          discountPercentage: 10,
        },
      ],
      popularProducts: [
        {
          imageUri: require('../../assets/img/sandwich_2.jpg'),
          name: 'Subway sandwich',
          price: 8.49,
          quantity: 0,
          discountPercentage: 10,
        },
        {
          imageUri: require('../../assets/img/pizza_1.jpg'),
          name: 'Pizza Margarita 35cm',
          price: 10.99,
          quantity: 0,
        },
        {
          imageUri: require('../../assets/img/cake_1.jpg'),
          name: 'Chocolate cake',
          price: 4.99,
          quantity: 0,
        },
      ],
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


 cutDescription(text) {
    if(text.length > 40) {
      let shortDescription = text.substr(0, 40)

      return(
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>{shortDescription}</Text>
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


  deletePublish(itemToBeDeleted) {
    let userUID = firebase.auth().currentUser.uid;
    Alert.alert(
      'Atenção!!!',
      'Você tem certeza que quer deletar este anúncio?',
      [
        {text: 'Não', onPress: () => {}},
          {text: 'Sim', onPress: () => firebase.firestore().collection('usuarios').doc(userUID).collection('cartoes').where("idAnuncio", "==", itemToBeDeleted).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc){
              doc.ref.delete();
            })
          })}
      ]
    )
  }


  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };


  renderCategoryItem = ({item, index}) => (
    <ImageBackground
      key={index}
      defaultSource={imgHolder}
      source={getImgSource(item.imageUri)}
      imageStyle={styles.cardImg}
      style={styles.card}>
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={this.navigateTo('Category')}
          style={styles.cardContainer}
          // borderless
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableItem>
      </View>
    </ImageBackground>
  );

  renderProductItem = ({item, index}) => (
    <ActionProductCard
      onPress={this.navigateTo('Product')}
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.price}
      discountPercentage={item.discountPercentage}
      label={item.label}
    />
  );

 
  render() {
    const {cartoesAuto, cartoesEstab} = this.state;

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
          backgroundColor={"#00b970"}
          barStyle="white-content"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
                <TouchableOpacity  style={{borderRadius:5, alignItems:'center', justifyContent:'center', width:116, height:27, backgroundColor: "#e3e3e3"}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Ativos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.navigateTo('TelaCriarCartaoVisita')} style={{marginRight:5, borderRadius:25, alignItems:'center', justifyContent:'center', width:40, height:40}}>
                        <FontAwesome5  name="plus" size={19} color={"#fff"} />
                </TouchableOpacity>

                <TouchableOpacity style={{marginRight:5, borderRadius:5, alignItems:'center', justifyContent:'center', width:116, height:27, backgroundColor: "#e3e3e3"}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Pendentes</Text>
                </TouchableOpacity>
              </View>


            </View>

                {cartoesEstab.length == 0 && cartoesAuto.length == 0 &&
                    <View style={{flex:1, alignItems:'center', paddingTop:"50%"}}>
                        <View>
                          <Image style={{width:200, height:200, marginLeft:20}} source={require("../../assets/img/notfoundnoback.gif")} />
                          <Text style={{fontWeight:'bold'}}>Nenhum Cartão Ativo Foi Encontrado</Text>
                        </View>
                    </View>
                }


                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                    <FlatList
                        keyExtractor={() => this.makeid(17)}
                        data={cartoesAuto}
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
                        <View style={{width: 336, height: 170, marginBottom:5,marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                            <View style={{flexDirection:'row'}}>
                                <Image source={fotoAnuncioEst} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:10, color:'#70AD66'}}>Tradução Profissional</Text>
                                  
                                  <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                    <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>Transcrevo qualquer documento em qualquer língua</Text>
                                  </View>
                                </View>
                            </View>  

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={this.navigateTo('TelaAnuncio')} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                    <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                </TouchableOpacity>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="trash" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 30}}>
                                    <FontAwesome5  name="briefcase" size={19} color={"#70AD66"} />
                                </View>
                            </View> 

                        </View>
                    </View>
                </View>



                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                        <View style={{width: 336, height: 170, marginBottom:5,marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                            <View style={{flexDirection:'row'}}>
                                <Image source={fotoAnuncioEst} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:10, color:'#70AD66'}}>Tradução Profissional</Text>
                                  
                                  <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                    <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>Transcrevo qualquer documento em qualquer língua</Text>
                                  </View>
                                </View>
                            </View>  

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={this.navigateTo('TelaAnuncio')} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                    <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                </TouchableOpacity>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="trash" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 30}}>
                                    <FontAwesome5  name="briefcase" size={19} color={"#70AD66"} />
                                </View>
                            </View> 

                        </View>
                    </View>
                </View>


                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                        <View style={{width: 336, height: 170, marginBottom:5,marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                            <View style={{flexDirection:'row'}}>
                                <Image source={fotoAnuncioEst} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:10, color:'#70AD66'}}>Tradução Profissional</Text>
                                  
                                  <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                    <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>Transcrevo qualquer documento em qualquer língua</Text>
                                  </View>
                                </View>
                            </View>  

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={this.navigateTo('TelaAnuncio')} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                    <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                </TouchableOpacity>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="trash" size={19} color={"grey"} />
                                </View>
                                
                                <View style={{marginTop: 24, marginRight: 30}}>
                                    <FontAwesome5  name="briefcase" size={19} color={"#70AD66"} />
                                </View>
                            </View> 

                        </View>
                    </View>
                </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
