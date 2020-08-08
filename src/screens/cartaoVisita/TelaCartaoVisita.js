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
  Picker,
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

//import icons
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

// ProductA Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-close';
const imgHolder = require('../../assets/img/smile.jpg');

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
export default class TelaCartaoVisita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horario: '',
      product: {
        images: [
          require('../../assets/img/smile.jpg'),
          require('../../assets/img/smile.jpg'),
          require('../../assets/img/smile.jpg'),
        ],
        name: 'Roberto Carlos',
        description:
          'Roberto Carlos Braga OMC (Cachoeiro de Itapemirim, 19 de abril de 1941)[1] é um cantor, compositor e empresário brasileiro. Começou a sua carreira sob influência do samba-canção e da bossa nova, no início da década de 1960, mudando seu repertório para o rock and roll logo em seguida. Com composições próprias, geralmente feitas em parceria com o amigo Erasmo Carlos, e versões de sucessos do então recente gênero musical, fundou as bases para o primeiro movimento de rock feito no Brasil. Com a fama, estrelou ao lado de Erasmo e Wanderléa um programa na RecordTV chamado Jovem Guarda, que daria nome ao primeiro movimento musical do rock brasileiro e que alçou Roberto e seus companheiros ao status de ídolos da geração. Além da carreira musical, estrelou filmes inspirados na fórmula lançada pelos Beatles - como Roberto Carlos em Ritmo de Aventura, Roberto Carlos e o Diamante Cor-de-rosa e Roberto Carlos a 300 Quilômetros por Hora.[2]',
      },
    };
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };



  render() {
    const {product, favorite} = this.state;
    const {
      images,
      description,
    } = product;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <ScrollView>
          <View style={styles.swiperContainer}>
            <Swiper
              loop={false}
              paginationStyle={styles.paginationStyle}
              activeDotStyle={styles.activeDot}
              dotStyle={styles.dot}
              index={isRTL ? images.length - 1 : 0}>
              {images.map((item, i) => (
                <Image
                  key={`image_${i}`}
                  defaultSource={imgHolder}
                  source={getImgSource(item)}
                  style={styles.slideImg}
                />
              ))}
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

          </View>

          <View style={styles.descriptionContainer}>
            <View style={styles.productTitleContainer}>
                  <Heading5 style={styles.productTitle}>{product.name}</Heading5>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <SmallText style={styles.shortDescription}>{description}</SmallText>
          </View>

        {/* INFO ESTAB
          <View style={styles.pickerGroup}>
            <View style={styles.pickerContainer}>
              <Caption style={styles.caption}>Informações do Estabelecimento:</Caption>
            </View>
          </View>
        */}

          <View style={styles.pickerGroup}>
            <View style={styles.pickerContainer}>
              <Caption style={styles.caption}>Informações do Autônomo:</Caption>
            </View>
          </View>
        

        {/* PICKER ESTAB <View style={{paddingHorizontal: 16, marginTop:20, flexDirection:'row', alignItems: 'center'}}>
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



        {/* LOCALIZACAO ESTAB   <View style={{paddingHorizontal: 16, marginTop:20, flexDirection:'row', alignItems: 'center'}}>
                <FontAwesome5 name="map-marked-alt" size={25} color={"#70AD66"}/>
                <Text style={{fontSize:15, marginLeft: 15}}>Rua Domingues, 203</Text>
          </View>
        */}

          <View style={{paddingHorizontal: 16, marginTop:20, flexDirection:'row', alignItems: 'center'}}>
                <FontAwesome5 name="phone-square" size={30} color={"#70AD66"}/>
                <Text style={{fontSize:15, marginLeft: 15}}>(11) 98107-3287</Text>
          </View>

          <View style={{paddingHorizontal: 16, marginTop:20, marginBottom:100, flexDirection:'row', alignItems: 'center'}}>
                <FontAwesome5 name="list-alt" size={30} color={"#70AD66"}/>
                <Text style={{fontSize:15, marginLeft: 15}}>Confeiteira</Text>
          </View>
        </ScrollView>

          

      {/*  <View style={styles.amountContainer}>
          <View style={styles.amountButtonsContainer}>
            <TouchableItem onPress={this.onPressDecreaseAmount} borderless>
              <View style={styles.iconContainer}>
                <Icon
                  name={MINUS_ICON}
                  size={20}
                  color={Colors.onPrimaryColor}
                />
              </View>
            </TouchableItem>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableItem onPress={this.onPressIncreaseAmount} borderless>
              <View style={styles.iconContainer}>
                <Icon
                  name={PLUS_ICON}
                  size={20}
                  color={Colors.onPrimaryColor}
                />
              </View>
            </TouchableItem>
          </View>
        </View>

        */}

       {/*  <View style={styles.bottomButtonContainer}>
          <Button onPress={this.goBack} title={'Add to Cart'.toUpperCase()} />
          <View style={styles.buttonPriceContainer}>
            <Text style={styles.buttonPriceText}>
              {`$ ${total.toFixed(2)}`}
            </Text>
          </View>
        </View>
      */}

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
