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


import { FontAwesome5 } from '@expo/vector-icons';

//import firebase
import firebase from '../../config/firebase';


const fotoCartaoVisita = require('../../assets/img/smile.jpg');

// import colors
import Colors from '../../theme/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


//CSS responsivo
import { SafeBackground, IconResponsive, AnuncioContainer, IconResponsiveNOBACK, Favorite,  Description, Heading, Title, ValueField, TouchableDetails, TextDetails, SignUpBottom, TextBold, TextBoldGolden } from '../home/styles';

import ShimmerPlaceholder  from 'react-native-shimmer-placeholder';

import { ThemeContext } from '../../../ThemeContext';


//import ADS
import { AdMobBanner} from 'expo-ads-admob';

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
});

// CartA
export default class CartaoFiltro extends Component {
  static contextType = ThemeContext

  constructor(props) {
    super(props);

    this.state = {
      total: 0.0,
      favorite: false,
      cartoesEstab: [],
      cartoesAuto: [],
      isFetchedPublish: false,
      isOpen: true,
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


  //sleep function
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async componentDidMount() {
    let e = this;
    let arrayOfSelectedCategories = this.props.route.params.categoriasFiltradas;
    let typeRoute = this.props.route.params.type;

    console.log('ARRAY RECEBIDO DO NAVIGATOR: ' + arrayOfSelectedCategories)
    console.log('type RECEBIDO DO NAVIGATOR: ' + typeRoute)


    if(arrayOfSelectedCategories.length == 0) {
        console.log('ENTROU NO IF NULO')
        this.props.navigation.navigate('Cart')
    }


    //Pegando lista de categorias selecionadas
    for(var i = 0; i < arrayOfSelectedCategories.length; i++) {
        console.log('Elementos: ' + arrayOfSelectedCategories)

        if(typeRoute == 'Autonomo') {
          firebase.firestore().collection('cartoes').where("type", "==", typeRoute).where("verifiedPublish", "==", true).where("categoryAuto", "in", arrayOfSelectedCategories).onSnapshot(documentSnapshot => {
              let cartoesAutoDidMount = [];
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

              this.sleep(1000).then(() => { 
                e.setState({isFetchedPublish: true})
              })
            })
        }

        
        if(typeRoute == 'Estabelecimento') {
          //obter anuncios ativos estabelecimento
          await firebase.firestore().collection('cartoes').where("type", "==", typeRoute).where("verifiedPublish", "==", true).where("categoryEstab", "in", arrayOfSelectedCategories).onSnapshot(documentSnapshot => {
            let cartoesEstabDidMount = [];
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

          this.sleep(1000).then(() => { 
            e.setState({isFetchedPublish: true})
          })
        })
        }


    }




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
        <TouchableWithoutFeedback style={{width: 336, height: 170, flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:5, marginTop: 10, borderRadius: 10, opacity:0.5}}>
            <IconResponsiveNOBACK style={{marginRight:40}} name="star" size={24}/>
            <Favorite>Favoritado</Favorite>
        </TouchableWithoutFeedback>
      );
  }

  AddToFav(id, publishObj) {
    let currentUser = firebase.auth().currentUser;

    if(currentUser == null) {
      alert('Você precisa estar logado para favoritar um cartão!')

      this.setState({isOpen: false})

      this.sleep(500).then(() => { 
        this.setState({isOpen: true})
      })
    }

    if(currentUser != null) {
      firebase.firestore().collection('usuarios').doc(currentUser.uid).collection('favoritos').doc(id).set(publishObj)
    
      this.setState({isOpen: false})

      this.sleep(500).then(() => { 
        this.setState({isOpen: true})
      })

    }
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
    const {cartoesAuto, cartoesEstab, isOpen, products, isFetchedPublish} = this.state;

    return (

      <SafeBackground>


        <StatusBar
          backgroundColor={this.context.dark ? '#121212' : 'white'}
          barStyle={this.context.dark ? "white-content" : "dark-content"}
        />
        

        <View style={styles.titleContainer}>
          <Heading>Cartões de Visita</Heading>
          {products.length > 0 && (
            <View style={styles.inline}>
              <TouchableOpacity onPress={this.navigateTo('FilterCartao')} style={{marginRight:5}}>
                    <IconResponsive  name="sort-alpha-up" size={19} />
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
                    onSwipeableRightOpen={() => this.AddToFav(item.idCartao, item)}
                    enabled={isOpen}
                  > 

                  <ShimmerPlaceholder visible={isFetchedPublish} shimmerColors={['#DAA520', '#FFD700', '#FFD700']} style={{width: 336, height: 170,  marginBottom:5,  marginTop: 10,  borderRadius: 10}}>
                    <AnuncioContainer>
                          <View style={{flexDirection:'row'}}>
                              <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                              
                              <View style={{flexDirection:'column'}}>
                                <Title>{item.nome}</Title>

                                {this.cutDescription(item.description)}

                              </View>
                          </View>  

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                              <TouchableDetails onPress={() => this.props.navigation.navigate('MostrarCartao', {idDoCartao: item.idCartao, phoneNumberNavigator: item.phone, idUserCartao: item.idUser})}>
                                  <TextDetails>Ver Detalhes</TextDetails>
                              </TouchableDetails>

                              <View style={{flexDirection:'row', marginTop:15}}>
                                  <ValueField style={{paddingTop:10, fontSize:12}}>{item.categoria}</ValueField>
                                  <IconResponsive style={{marginLeft:15, marginTop:10}} name="clone" size={19}/>
                              </View>

                              <View style={{marginTop: 24, marginRight: 30}}>
                                  <IconResponsive  name="user-tie" size={19}/>
                            </View>
                          </View> 

                    </AnuncioContainer>
                  </ShimmerPlaceholder>
                  </Swipeable>
                }
                contentContainerStyle={styles.productList}
              />

            <AdMobBanner
              style={{marginLeft: 20}}
              bannerSize="leaderboard"
              adUnitID="ca-app-pub-1397640114399871/3366763355"
              setTestDeviceIDAsync
              servePersonalizedAds
              onDidFailToReceiveAdWithError={(err) => console.log(err)} 
            /> 
            </View>

            <View>
              <FlatList
                data={cartoesEstab}
                keyExtractor={() => this.makeid(17)}
                renderItem={({item}) => 
                  <Swipeable
                    renderRightActions={this.RightAction}
                    onSwipeableRightOpen={() => this.AddToFav(item.idCartao, item)}
                  > 
                    <ShimmerPlaceholder visible={isFetchedPublish} shimmerColors={['#DAA520', '#FFD700', '#FFD700']} style={{width: 336, height: 170,  marginBottom:5,  marginTop: 10,  borderRadius: 10}}>
                    <AnuncioContainer>
                              <View style={{flexDirection:'row'}}>
                                  <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                  
                                  <View style={{flexDirection:'column', }}>
                                    <Title>{item.title}</Title>

                                    {this.cutDescription(item.description)}

                                  </View>
                              </View>  

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <TouchableDetails onPress={() => this.props.navigation.navigate('MostrarCartao', {idDoCartao: item.idCartao, phoneNumberNavigator: item.phone, idUserCartao: item.idUser})}>
                                      <TextDetails>Ver Detalhes</TextDetails>
                                  </TouchableDetails>

                                  <View style={{flexDirection:'row', marginTop:15}}>
                                      <ValueField style={{paddingTop:10, fontSize:12}}>{item.categoria}</ValueField>
                                      <IconResponsive style={{marginLeft:15, marginTop:10}} name="clone" size={19}/>
                                  </View>

                                  <View style={{marginTop: 24, marginRight: 30}}>
                                      <IconResponsive  name="briefcase" size={19}/>
                                </View>
                              </View> 

                    </AnuncioContainer>
                    </ShimmerPlaceholder>
                  </Swipeable>
                }
                contentContainerStyle={styles.productList}
              />

            <AdMobBanner
              style={{marginLeft: 20}}
              bannerSize="leaderboard"
              adUnitID="ca-app-pub-1397640114399871/3366763355"
              setTestDeviceIDAsync
              servePersonalizedAds
              onDidFailToReceiveAdWithError={(err) => console.log(err)} 
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
      </SafeBackground>
    );
  }
}
