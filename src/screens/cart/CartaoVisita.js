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
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import remove from 'lodash/remove';

// import components
import ActionProductCardHorizontal from '../../components/cards/ActionProductCardHorizontal';
import Button from '../../components/buttons/Button';
import {Heading6, Subtitle1} from '../../components/text/CustomText';
import Divider from '../../components/divider/Divider';
import EmptyState from '../../components/emptystate/EmptyState';

//import gradient
import  { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome5 } from '@expo/vector-icons';

const fotoAnuncio = require('../../assets/img/confeiteira.jpeg');
const fotoAnuncioEst = require('../../assets/img/traducao.jpg')

// import colors
import Colors from '../../theme/colors';

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

  componentDidMount = () => {
    this.updateTotalAmount();
  };

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  swipeoutOnPressRemove = (item) => () => {
    let {products} = this.state;
    const index = products.indexOf(item);

    products = remove(products, (n) => products.indexOf(n) !== index);

    this.setState(
      {
        products,
      },
      () => {
        this.updateTotalAmount();
      },
    );
  };

  onPressRemove = (item) => () => {
    let {quantity} = item;
    quantity -= 1;

    let {products} = this.state;
    const index = products.indexOf(item);

    if (quantity === 0) {
      products = remove(products, (n) => products.indexOf(n) !== index);
    } else {
      products[index].quantity = quantity;
    }

    this.setState(
      {
        products: [...products],
      },
      () => {
        this.updateTotalAmount();
      },
    );
  };

  onPressAdd = (item) => () => {
    const {quantity} = item;
    const {products} = this.state;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

    this.setState(
      {
        products: [...products],
      },
      () => {
        this.updateTotalAmount();
      },
    );
  };

  updateTotalAmount = () => {
    const {products} = this.state;
    let total = 0.0;

    products.forEach((product) => {
      let {price} = product;
      const {discountPercentage, quantity} = product;

      if (typeof discountPercentage !== 'undefined') {
        price -= price * discountPercentage * 0.01;
      }
      total += price * quantity;
    });

    this.setState({
      total,
    });
  };

  keyExtractor = (item) => item.id.toString();

  renderProductItem = ({item}) => (
    <View style={{flex:1, alignItems: 'center'}}>
        <View>
            <View style={{width: 336, height: 170, marginBottom:5, marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                <View style={{flexDirection:'row'}}>
                    <Image source={fotoAnuncio} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                    
                    <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:25, color:'#70AD66'}}>Forneço Cupcakes</Text>
                      
                      <View style={{justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>Sou confeiteiro Profissional, tenho variedades de sabores</Text>
                      </View>
                    </View>
                </View>  

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={this.navigateTo('TelaAnuncio')} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                        <Text style={{color: 'white'}}>Ver Detalhes</Text>
                    </TouchableOpacity>

                    <View style={{marginTop: 24, marginRight: 30}}>
                        <FontAwesome5  name="user-tie" size={19} color={"#70AD66"} />
                    </View>
                </View> 

            </View>
        </View>
    </View>
  );

  render() {
    const {total, products} = this.state;

    return (

      <SafeAreaView style={styles.container}>

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
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />
        

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Cartões de Visita</Heading6>
          {products.length > 0 && (
            <View style={styles.inline}>
              <TouchableOpacity style={{marginRight:5}}>
                    <FontAwesome5  name="sort-alpha-up" size={19} color={"#fff"} />
              </TouchableOpacity>
            
            </View>
          )}
        </View>

        {products.length === 0 ? (
          <EmptyState
            showIcon
            iconName={EMPTY_STATE_ICON}
            title="Your Cart is Empty"
            message="Looks like you haven't added anything to your cart yet"
          />
        ) : (
          <Fragment>
            <View style={styles.flex1}>
              <FlatList
                data={products}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderProductItem}
                contentContainerStyle={styles.productList}
              />
            </View>

            <Divider />

           {/* 
            <View>
              <View style={styles.bottomButtonContainer}>
                <Button
                  onPress={this.navigateTo('Checkout')}
                  title="Checkout"
                />
              </View>
            </View>
            */}
          </Fragment>
        )}
      </SafeAreaView>
    );
  }
}
