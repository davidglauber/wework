/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  I18nManager,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import Button from '../../components/buttons/Button';
import {Caption, Heading5, SmallText} from '../../components/text/CustomText';
import Icon from '../../components/icon/Icon';
import SizePicker from '../../components/pickers/SizePicker';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

//import firebase
import firebase from '../../config/firebase';

//import icons
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

// ProductA Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const FAVORITE_ICON = IOS ? 'ios-star' : 'md-star';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-close';
const imgHolder = require('../../assets/img/confeiteira.jpeg');

// ProductA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  swiperContainer: {
    width: '100%',
    height: 228,
  },
  paginationStyle: {
    bottom: 12,
    transform: [{scaleX: isRTL ? -1 : 1}],
  },
  dot: {backgroundColor: Colors.background},
  activeDot: {backgroundColor: Colors.primaryColor},
  slideImg: {
    width: '100%',
    height: 228,
    resizeMode: 'cover',
  },
  topButton: {
    position: 'absolute',
    top: 16,
    borderRadius: 18,
    backgroundColor: Colors.background,
  },
  left: {left: 16},
  right: {right: 16},
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
  },
  favorite: {
    backgroundColor: Colors.secondaryColor,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
  },
  productTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
  },
  productTitle: {
    fontWeight: '700',
  },
  priceText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.primaryColor,
  },
  shortDescription: {
    paddingBottom: 8,
    textAlign: 'left',
  },
  pickerGroup: {
    marginTop: 24,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  caption: {
    width: 300,
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 17
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  amountButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  quantity: {
    top: -1,
    paddingHorizontal: 20,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondaryColor,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  buttonPriceContainer: {
    position: 'absolute',
    top: 0,
    left: 40,
    height: 48,
    justifyContent: 'center',
  },
  buttonPriceText: {
    fontSize: 16,
    lineHeight: 18,
    color: Colors.onPrimaryColor,
  },
});

// ProductA
export default class TelaAnuncio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horario: '',
      anuncioAuto:[],
      anuncioEstab:[],
      product: {
        images: [
          require('../../assets/img/confeiteira.jpeg'),
          require('../../assets/img/confeiteira.jpeg'),
          require('../../assets/img/confeiteira.jpeg'),
        ],
        name: 'Forneço Cupcakes',
        description:
          'Sou confeiteiro Profissional, tenho variedades de sabores, entrego em todo país. Encomenda a combinar por chat. Peça já o seu!',
        price: 56.7,
        quantity: 1,
        servingSize: 1,
        sideDish: 20,
        total: 10.9,
      },
      favorite: false,
    };
  }

  async componentDidMount() {
    let e = this;
    let idDoAnuncio = this.props.route.params.idDoAnuncio;
    let currentUserUID = firebase.auth().currentUser.uid;

    console.log('ID DO ANUNCIO: ' + idDoAnuncio)

    await firebase.firestore().collection(`usuarios`).doc(`${currentUserUID}`).collection('anuncios').where("idAnuncio", "==", idDoAnuncio).where("type", "==", "Autonomo").get().then(function(querySnapshot){
      let anuncioAutoDidMount = []
      querySnapshot.forEach(function(doc) {
        anuncioAutoDidMount.push({
          idUser: doc.data().idUser,
          value: doc.data().valueServiceAuto,
          idAnuncio: doc.data().idAnuncio,
          nome: doc.data().nome,
          photo: doc.data().photoPublish,
          phone: doc.data().phoneNumberAuto,
          title: doc.data().titleAuto,
          categoria: doc.data().categoryAuto,
          description: doc.data().descriptionAuto,
          type: doc.data().type,
          verified: doc.data().verifiedPublish
        })
      })
      e.setState({anuncioAuto: anuncioAutoDidMount})
    })


    await firebase.firestore().collection(`usuarios`).doc(`${currentUserUID}`).collection('anuncios').where("idAnuncio", "==", idDoAnuncio).where("type", "==", "Estabelecimento").get().then(function(querySnapshot){
      let anuncioEstabDidMount = []
      querySnapshot.forEach(function(doc) {
        anuncioEstabDidMount.push({
          idUser: doc.data().idUser,
          value: doc.data().valueServiceEstab,
          idAnuncio: doc.data().idAnuncio,
          photo: doc.data().photoPublish,
          phone: doc.data().phoneNumberEstab,
          title: doc.data().titleEstab,
          categoria: doc.data().categoryEstab,
          description: doc.data().descriptionEstab,
          type: doc.data().type,
          verified: doc.data().verifiedPublish,
          timeToOpen: doc.data().timeOpen,
          timeToClose: doc.data().timeClose,
          local: doc.data().localEstab,
          workDays: doc.data().workDays
        })
      })
      e.setState({anuncioEstab: anuncioEstabDidMount})
    })

    console.log('ARRAY ANUNCIO anuncioEstab: ' + this.state.anuncioEstab)
    console.log('ARRAY ANUNCIO autonomo: ' + this.state.anuncioAuto)
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  onPressAddToFavorites = () => {
    const {favorite} = this.state;

    this.setState({
      favorite: !favorite,
    });
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


  render() {
    const {product, favorite, anuncioAuto, anuncioEstab} = this.state;
    const {
      images,
    } = product;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <ScrollView>

        <FlatList
            keyExtractor={() => this.makeid(17)}
            data={anuncioAuto}
            renderItem={({item}) => 
              <View>
                <View style={styles.swiperContainer}>
                  <Swiper
                    loop={false}
                    paginationStyle={styles.paginationStyle}
                    activeDotStyle={styles.activeDot}
                    dotStyle={styles.dot}
                    index={isRTL ? images.length - 1 : 0}>
                      <Image
                        source={{uri: item.photo}}
                        style={styles.slideImg}
                      />
                  </Swiper>

                  <View style={[styles.topButton, styles.left]}>
                    <TouchableItem onPress={this.goBack} borderless>
                      <View style={styles.buttonIconContainer}>
                        <Icon
                          name={CLOSE_ICON}
                          size={22}
                          color={Colors.secondaryText}
                        />
                      </View>
                    </TouchableItem>
                  </View>

                  <View
                    style={[
                      styles.topButton,
                      styles.right,
                      favorite && styles.favorite,
                    ]}>
                    <TouchableItem onPress={this.onPressAddToFavorites} borderless>
                      <View style={styles.buttonIconContainer}>
                        <Icon
                          name={FAVORITE_ICON}
                          size={22}
                          color={
                            favorite ? Colors.onSecondaryColor : Colors.secondaryText
                          }
                        />
                      </View>
                    </TouchableItem>
                  </View>
                </View>

                  <View style={styles.descriptionContainer}>
                      <View style={styles.productTitleContainer}>
                            <Heading5 style={styles.productTitle}>{item.title}</Heading5>
                          <Text style={styles.priceText}>{item.value}</Text>
                      </View>
                  </View>

                  <View style={styles.descriptionContainer}>
                    <SmallText style={styles.shortDescription}>{item.description}</SmallText>
                  </View>



                  <View style={styles.pickerGroup}>
                    <View style={styles.pickerContainer}>
                      <Caption style={styles.caption}>Informações do Autônomo:</Caption>
                    </View>
                  </View>



                  <View style={{paddingHorizontal: 16, marginTop:20, flexDirection:'row', alignItems: 'center'}}>
                      <FontAwesome5 name="user-tie" size={25} color={"#70AD66"}/>
                      <Text style={{fontSize:15, marginLeft: 15}}>{item.nome}</Text>
                  </View>


                  <View style={{paddingHorizontal: 16, marginTop:20, flexDirection:'row', alignItems: 'center'}}>
                        <FontAwesome5 name="phone-square" size={30} color={"#70AD66"}/>
                        <Text style={{fontSize:15, marginLeft: 15}}>{item.phone}</Text>
                  </View>

                  <View style={{paddingHorizontal: 16, marginTop:20, marginBottom:100, flexDirection:'row', alignItems: 'center'}}>
                        <FontAwesome5 name="list-alt" size={30} color={"#70AD66"}/>
                        <Text style={{fontSize:15, marginLeft: 15}}>{item.categoria}</Text>
                  </View>
          
                </View>
            }
          />

        </ScrollView>


















        <ScrollView>

        <FlatList
            keyExtractor={() => this.makeid(17)}
            data={anuncioEstab}
            renderItem={({item}) => 
              <View>
                <View style={styles.swiperContainer}>
                  <Swiper
                    loop={false}
                    paginationStyle={styles.paginationStyle}
                    activeDotStyle={styles.activeDot}
                    dotStyle={styles.dot}
                    index={isRTL ? images.length - 1 : 0}>
                      <Image
                        source={{uri: item.photo}}
                        style={styles.slideImg}
                      />
                  </Swiper>

                  <View style={[styles.topButton, styles.left]}>
                    <TouchableItem onPress={this.goBack} borderless>
                      <View style={styles.buttonIconContainer}>
                        <Icon
                          name={CLOSE_ICON}
                          size={22}
                          color={Colors.secondaryText}
                        />
                      </View>
                    </TouchableItem>
                  </View>

                  <View
                    style={[
                      styles.topButton,
                      styles.right,
                      favorite && styles.favorite,
                    ]}>
                    <TouchableItem onPress={this.onPressAddToFavorites} borderless>
                      <View style={styles.buttonIconContainer}>
                        <Icon
                          name={FAVORITE_ICON}
                          size={22}
                          color={
                            favorite ? Colors.onSecondaryColor : Colors.secondaryText
                          }
                        />
                      </View>
                    </TouchableItem>
                  </View>
                </View>

                  <View style={styles.descriptionContainer}>
                      <View style={styles.productTitleContainer}>
                            <Heading5 style={styles.productTitle}>{item.title}</Heading5>
                          <Text style={styles.priceText}>{item.value}</Text>
                      </View>
                  </View>

                  <View style={styles.descriptionContainer}>
                    <SmallText style={styles.shortDescription}>{item.description}</SmallText>
                  </View>



                  <View style={styles.pickerGroup}>
                    <View style={styles.pickerContainer}>
                      <Caption style={styles.caption}>Informações do Estabelecimento:</Caption>
                    </View>
                  </View>

                  <View style={{paddingHorizontal: 16, marginTop:20, flexDirection:'row', alignItems: 'center'}}>
                      <FontAwesome5 name="clock" size={25} color={"#70AD66"}/>
                      <Text style={{fontSize:15, marginLeft: 15}}>Aberto durante {item.workDays} dias na semana</Text>
                  </View>



                  <View style={{paddingHorizontal: 16, marginTop:20, flexDirection:'row', alignItems: 'center'}}>
                      <FontAwesome5 name="map-marked-alt" size={25} color={"#70AD66"}/>
                        <Text style={{fontSize:15, marginLeft: 15}}>{item.local}</Text>
                  </View>


                  <View style={{paddingHorizontal: 16, marginTop:20, flexDirection:'row', alignItems: 'center'}}>
                        <FontAwesome5 name="phone-square" size={30} color={"#70AD66"}/>
                        <Text style={{fontSize:15, marginLeft: 15}}>{item.phone}</Text>
                  </View>

                  <View style={{paddingHorizontal: 16, marginTop:20, marginBottom:100, flexDirection:'row', alignItems: 'center'}}>
                        <FontAwesome5 name="list-alt" size={30} color={"#70AD66"}/>
                        <Text style={{fontSize:15, marginLeft: 15}}>{item.categoria}</Text>
                  </View>
          
                </View>
            }
          />


        {/* <View style={{paddingHorizontal: 16, marginTop:20, flexDirection:'row', alignItems: 'center'}}>
                <FontAwesome5 name="clock" size={25} color={"#70AD66"}/>
                <Picker
                  selectedValue={this.state.horario}
                  onValueChange={(itemValue, itemIndex) => this.setState({horario: itemValue})}
                  style={{marginLeft:10, width: 300, height:50}}>
                  <Picker.Item label="Segunda: De: 8:00 às 23:00" value=""/>
                  <Picker.Item label="Terça: De: 8:00 às 23:00" value=""/>
                  <Picker.Item label="Quarta: De: 8:00 às 23:00" value=""/>
                  <Picker.Item label="Quinta: De: 8:00 às 23:00" value=""/>
                  <Picker.Item label="Sexta: De: 8:00 às 23:00" value=""/>
                  <Picker.Item label="Sábado: De: 8:00 às 21:00" value=""/>
                  <Picker.Item label="Domingo: De: 8:00 às 21:00" value=""/>
                </Picker>
            </View>

        */}

        {/* <View style={{paddingHorizontal: 16, marginTop:20, flexDirection:'row', alignItems: 'center'}}>
                <FontAwesome5 name="map-marked-alt" size={25} color={"#70AD66"}/>
                <Text style={{fontSize:15, marginLeft: 15}}>Rua Domingues, 203</Text>
            </View>
        */}

        </ScrollView>

          
        <View style={{flex: 1, flexDirection:'row', marginBottom:50, bottom:50}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', width: 329, height:80, left:16, padding:20,  backgroundColor: '#E3FAE5', borderRadius:20}}>
                <TouchableOpacity style={{flexDirection:'row', padding:10, alignItems:'center', width: '100%', height:'100%', borderRadius: 20, backgroundColor: '#70AD66'}}>
                    <Text style={{fontWeight:'bold', color:'white', marginRight:20}}>Telefonar</Text>
                    <FontAwesome5 name="mobile" size={20} color={"white"}/>
                </TouchableOpacity>   

                <TouchableOpacity style={{flexDirection:'row', padding:10, alignItems:'center', width: '100%', height:'100%', borderRadius: 20, backgroundColor: '#70AD66'}}>
                    <Text style={{fontWeight:'bold', color:'white', marginRight:20}}>Conversar</Text>
                    <FontAwesome5 name="comment-alt" size={20} color={"white"}/>
                </TouchableOpacity>            
            </View>

        </View>
      </SafeAreaView>
    );
  }
}
