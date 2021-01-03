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
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
} from 'react-native';

// import components
import Button from '../../components/buttons/Button';


// import colors
import Colors from '../../theme/colors';

import { ThemeContext } from '../../../ThemeContext';


//import IAP API 
import Qonversion from 'react-native-qonversion';

//consts
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// PaymentMethodA Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const MORE_ICON = IOS ? 'ios-more' : 'md-more';
const EDIT_ICON = IOS ? 'ios-create' : 'md-create';
const SAVE_ICON = IOS ? 'ios-save' : 'md-save';
const REMOVE_ICON = IOS ? 'ios-remove-circle' : 'md-remove-circle';
const BOTTOM_SHEET_PB = IOS ? 16 : 0;



// PaymentMethodA Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
  },
  swiperContainer: {
    height: 240, // cardContainer.height + dot.height
  },
  dot: {
    backgroundColor: Colors.black,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#DAA520",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationStyle: {
    bottom: 0,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  cardContainer: {
    width: '100%',
    height: 232,
  },
  editButtonContainer: {
    position: 'absolute',
    top: 32,
    right: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
  },
  buttonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  bottomSheetItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    height: 64,
  },
  bottomSheetCaption: {paddingVertical: 2},
  bottomSheetAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    height: 56,
  },
  bottomSheetIconContainer: {
    marginRight: IOS ? 24 : 32,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// PaymentMethodA
export default class PaymentMethodA extends Component {
  static contextType = ThemeContext

  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      products: []
    };
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  openBottomSheet = (cardNumber) => () => {
    this.setState(
      {
        cardNumber,
      },
      this.bottomSheet.open(), // callback
    );
  };


  componentDidMount() {
    Qonversion.launchWithKey('SQf_c2TSWa25dt07-6DQPxFwmYV_h9Ry', false)
  }
 

  async signPremium() {
    
    alert('OI MEU CHAPA')
  }






  render() {
    const {cardNumber} = this.state;

    return (
      <View style={{flex:1, backgroundColor:'#fff'}}>
        <StatusBar
          backgroundColor={this.context.dark ? '#121212' : 'white'}
          barStyle={this.context.dark ? "white-content" : "dark-content"}
        />

        <View style={{alignItems:'center', marginBottom: windowHeight/6}}>
          <Image style={{width:200, height:200}} source={require("../../assets/img/star.gif")} />
          <Text style={{fontSize:20, fontWeight:'bold'}}>Mensal: R$ 9,99</Text>
        </View>
        
        <View style={{flex:1}}>
          <View style={{flexDirection:'row', alignItems:'center', padding:12}}>
            <Image style={{width:30, height:30}} source={require('../../assets/img/correct.png')}/>
            <Text style={{marginLeft:10}}>5 Anúncios e 5 Cartões Simultâneos</Text>
          </View>

          <View style={{flexDirection:'row', alignItems:'center', padding:12}}>
            <Image style={{width:30, height:30}} source={require('../../assets/img/correct.png')}/>
            <Text style={{marginLeft:10}}>Maior Visibilidade</Text>
          </View>

          <View style={{flexDirection:'row', alignItems:'center', padding:12}}>
            <Image style={{width:30, height:30}} source={require('../../assets/img/correct.png')}/>
            <Text style={{marginLeft:10}}>Sem Anúncios no App WeWo</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.signPremium()}
            title="Assinar Premium"
          />
        </View>

      </View>
    );
  }
}
