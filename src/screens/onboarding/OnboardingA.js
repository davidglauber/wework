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
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import Swiper from 'react-native-swiper';


//import firebase
import firebase from '../../config/firebase';

// import components
import {Heading5, Paragraph} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

// OnboardingA Config
const isRTL = I18nManager.isRTL;
const BUTTON_HEIGHT = 58; // pagination button height
const BUTTON_WIDTH = 92; // pagination button width

const slide1Img = require('../../assets/img/welcomeanimation.gif');
const slide2Img = require('../../assets/img/welcomeanimation2.gif');
const slide3Img = require('../../assets/img/welcomeanimation3.gif');
const slide4Img = require('../../assets/img/welcomeanimation4.gif');

const slides = [
  {
    id: 'slide1',
    lottie: slide1Img,
    title: 'Seja bem-vindo(a) ao WeWork!',
    description:
      'Esperamos que você tenha a melhor experiência possível com o nosso aplicativo!',
  },
  {
    id: 'slide2',
    lottie: slide2Img,
    title: 'Anuncie o seu serviço de forma Gratuita',
    description: 'Na WeWork você pode anunciar o seu serviço de forma totalmente gratuita, dando visibilidade a milhões de pessoas',
  },
  {
    id: 'slide3',
    lottie: slide3Img,
    title: 'Quer publicar um serviço?',
    description: 'Para cadastrar um serviço no aplicativo você deve registrar-se',
  },
  {
    id: 'slide4',
    lottie: slide4Img,
    title: 'Nosso suporte possui uma disponibilidade de 24h',
    description: 'Caso tenha algum problema ou dúvida, contate o nosso suporte pelo aplicativo',
  },
];

// OnboardingA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  swiperContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  slideImg: {
    borderRadius: 8,
    width: 232,
    height: 192,
  },
  title: {
    paddingTop: 24,
    color: Colors.primaryText,
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 23,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.12)',
    height: BUTTON_HEIGHT,
    backgroundColor: Colors.background,
  },
  buttonContainer: {
    width: BUTTON_WIDTH,
  },
  leftButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    paddingLeft: 10,
    paddingRight: 12,
  },
  rightButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    paddingLeft: 12,
    paddingRight: 10,
  },
  actionButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.primaryColor,
  },
  dot: {
    margin: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bgDark: {
    backgroundColor: Colors.primaryColorDark,
  },
  bgLight: {
    backgroundColor: Colors.primaryColorDark,
    opacity: 0.3,
  },
});

export default class OnboardingA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }



   componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
          if(user) {
            this.props.navigation.navigate('HomeNavigator')
          } else {
            return null
          }
      })
  }

  onIndexChanged = (index) => {
    let activeIndex;
    if (isRTL) {
      activeIndex = slides.length - 1 - index;
    } else {
      activeIndex = index;
    }
    this.setState({
      activeIndex: activeIndex,
    });
  };

  previousSlide = () => {
    this.swiper.scrollBy(-1, true);
  };

  nextSlide = () => {
    this.swiper.scrollBy(1, true);
  };

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  render() {
    const {activeIndex} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.swiperContainer}>
          <Swiper
            ref={(swiper) => {
              this.swiper = swiper;
            }}
            index={isRTL ? slides.length - 1 : 0}
            onIndexChanged={this.onIndexChanged}
            loop={false}
            showsPagination={false}>
            {slides.map((item) => (
              <View key={item.id} style={styles.slide}>
                <Image source={item.lottie} style={{width: 232, height: 192}}/> 
                <Heading5 style={styles.title}>{item.title}</Heading5>
                <View style={styles.descriptionContainer}>
                  <Paragraph style={styles.descriptionText}>
                    {item.description}
                  </Paragraph>
                </View>
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.paginationContainer}>
          <View style={styles.buttonContainer}>
            {activeIndex > 0 ? (
              <TouchableItem
                onPress={isRTL ? this.nextSlide : this.previousSlide}>
                <View style={[styles.row, styles.leftButton]}>
                  <Icon
                    name={isRTL ? 'chevron-right' : 'chevron-left'}
                    size={24}
                    color={Colors.primaryColor}
                  />
                  <Text style={styles.buttonText}>{'voltar'.toUpperCase()}</Text>
                </View>
              </TouchableItem>
            ) : (
              <TouchableItem onPress={this.navigateTo('HomeNavigator')}>
                <View style={styles.actionButton}>
                  <Text style={styles.buttonText}>{'pular'.toUpperCase()}</Text>
                </View>
              </TouchableItem>
            )}
          </View>

          <View style={styles.row}>
            {slides.map((item, i) => (
              <View
                key={`dot_${item.id}`}
                style={[
                  styles.dot,
                  activeIndex === i ? styles.bgDark : styles.bgLight,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            {activeIndex < slides.length - 1 ? (
              <TouchableItem
                onPress={isRTL ? this.previousSlide : this.nextSlide}>
                <View style={[styles.row, styles.rightButton]}>
                  <Text style={styles.buttonText}>{'próximo'.toUpperCase()}</Text>
                  <Icon
                    name={isRTL ? 'chevron-left' : 'chevron-right'}
                    size={24}
                    color={Colors.primaryColor}
                  />
                </View>
              </TouchableItem>
            ) : (
              <TouchableItem onPress={this.navigateTo('HomeNavigator')}>
                <View style={styles.actionButton}>
                  <Text style={styles.buttonText}>{'Entrar'.toUpperCase()}</Text>
                </View>
              </TouchableItem>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
