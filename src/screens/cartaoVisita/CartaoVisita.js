/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import remove from 'lodash/remove';

// import components
import {Heading6, SmallText} from '../../components/text/CustomText';
import EmptyState from '../../components/emptystate/EmptyState';


//import GestureHandler
import Swipeable from 'react-native-gesture-handler/Swipeable';

//import gradient
import  { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome5 } from '@expo/vector-icons';

//import firebase
import firebase from '../../config/firebase';


const fotoCartaoVisita = require('../../assets/img/smile.jpg');

// import colors
import Colors from '../../theme/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// CartA Config
const EMPTY_STATE_ICON = 'cart-remove';

// CartA Styles
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  titleText: {
    fontWeight: '700',
    color: 'white'
  },
  productList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12,
  },
  subTotalText: {
    top: -2,
    fontWeight: '500',
    color: Colors.onSurface,
  },
  subTotalPriceText: {
    fontWeight: '700',
    color: Colors.primaryColor,
  },
  bottomButtonContainer: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

// CartA
export default class CartaoVisita extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0.0,
      favorite: false,
      cartoesEstab: [],
      cartoesAuto: [],
      products: [
        {
          id: 'product1',
          imageUri: require('../../assets/img/sandwich_2.jpg'),
          name: 'Subway sandwich',
          price: 10.0,
          quantity: 2,
          discountPercentage: 10,
        },
        {
          id: 'product2',
          imageUri: require('../../assets/img/pizza_1.jpg'),
          name: 'Pizza Margarita 35cm',
          price: 20.0,
          quantity: 1,
        },
        {
          id: 'product3',
          imageUri: require('../../assets/img/cake_1.jpg'),
          name: 'Chocolate cake',
          price: 30.0,
          quantity: 2,
        },
      ],
    };
  }

  async componentDidMount() {
    let e = this;

    await firebase.firestore().collection('cartoes').where("type", "==", "Autonomo").where("verifiedPublish", "==", true).onSnapshot(documentSnapshot => {
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

    await firebase.firestore().collection('cartoes').where("type", "==", "Estabelecimento").where("verifiedPublish", "==", true).onSnapshot(documentSnapshot => {
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
  };

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };


  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


  RightAction() {
      return(
        <TouchableOpacity style={{width: 336, height: 170, flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:5, marginTop: 10, borderRadius: 10, opacity:0.5}}>
            <FontAwesome5 style={{marginRight:40}} name="star" size={24} color={"white"} />
            <Text style={{color:'#fff', fontSize:30}}>Favoritar</Text>
        </TouchableOpacity>
      );
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
    const {cartoesAuto, cartoesEstab, products} = this.state;

    return (

      <SafeAreaView style={styles.container}>

        <LinearGradient
          // Background Linear Gradient
          colors={['#DAA520', '#DAA520', '#DAA520']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        />

        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />
        

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Cartões de Visita</Heading6>
          {products.length > 0 && (
            <View style={styles.inline}>
              <TouchableOpacity onPress={this.navigateTo('FilterCartao')} style={{marginRight:5}}>
                    <FontAwesome5  name="sort-alpha-up" size={19} color={"#fff"} />
              </TouchableOpacity>
            
            </View>
          )}
        </View>

          <ScrollView>
            <View>
              <FlatList
                data={cartoesAuto}
                keyExtractor={() => this.makeid(17)}
                renderItem={({item}) => 
                  <Swipeable
                    renderRightActions={this.RightAction}
                  > 
                    <View style={{width: 336, height: 180, marginBottom:5, marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2, }}>
                          <View style={{flexDirection:'row'}}>
                              <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                              
                              <View style={{flexDirection:'column'}}>
                                <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:15, color:'#70AD66'}}>{item.nome}</Text>

                                {this.cutDescription(item.description)}

                              </View>
                          </View>  

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('MostrarCartao', {idDoCartao: item.idCartao, phoneNumberNavigator: item.phone, idUserCartao: item.idUser})} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                  <Text style={{color: 'white'}}>Ver Detalhes</Text>
                              </TouchableOpacity>

                              <View style={{flexDirection:'row', marginTop:15}}>
                                  <Text style={{paddingTop:10, color: '#70AD66', fontSize:12}}>{item.categoria}</Text>
                                  <FontAwesome5 style={{marginLeft:15, marginTop:10}} name="clone" size={19} color={'#70AD66'} />
                              </View>

                              <View style={{marginTop: 24, marginRight: 30}}>
                                  <FontAwesome5  name="user-tie" size={19} color={"#70AD66"} />
                            </View>
                          </View> 

                    </View>
                  </Swipeable>
                }
                contentContainerStyle={styles.productList}
              />

            </View>

            <View>
              <FlatList
                data={cartoesEstab}
                keyExtractor={() => this.makeid(17)}
                renderItem={({item}) => 
                  <Swipeable
                    renderRightActions={this.RightAction}
                  > 
                    <View style={{width: 336, height: 180, marginBottom:5, marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                              <View style={{flexDirection:'row'}}>
                                  <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                  
                                  <View style={{flexDirection:'column', }}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:15, color:'#70AD66'}}>{item.title}</Text>

                                    {this.cutDescription(item.description)}

                                  </View>
                              </View>  

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('MostrarCartao', {idDoCartao: item.idCartao, phoneNumberNavigator: item.phone, idUserCartao: item.idUser})} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                      <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                  </TouchableOpacity>

                                  <View style={{flexDirection:'row', marginTop:15}}>
                                      <Text style={{paddingTop:10, color: '#70AD66', fontSize:12}}>{item.categoria}</Text>
                                      <FontAwesome5 style={{marginLeft:15, marginTop:10}} name="clone" size={19} color={'#70AD66'} />
                                  </View>

                                  <View style={{marginTop: 24, marginRight: 30}}>
                                      <FontAwesome5  name="briefcase" size={19} color={"#70AD66"} />
                                </View>
                              </View> 

                            </View>
                  </Swipeable>
                }
                contentContainerStyle={styles.productList}
              />

            </View>

          </ScrollView>


          <View style={{justifyContent: 'center',alignItems: 'center', padding: 8}}>
            <View style={{borderTopWidth:0,justifyContent: 'center', alignItems: 'center', height: 28,borderRadius: 4,  paddingHorizontal: 8, backgroundColor: '#f1f1f1'}}>
                <SmallText>
                      {`Deslize para a esquerda para favoritar`}
                </SmallText>
            </View>
          </View>
      </SafeAreaView>
    );
  }
}
