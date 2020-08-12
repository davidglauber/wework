/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Alert,
  I18nManager,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Color from 'color';

// import components
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import {Heading5, Paragraph} from '../../components/text/CustomText';
import NumericKeyboard from '../../components/keyboard/NumericKeyboard';


//import firebase
import firebase from '../../config/firebase';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaVerifier } from 'expo-firebase-recaptcha';


// import colors
import Colors from '../../theme/colors';

// VerificationB Config
const isRTL = I18nManager.isRTL;

// VerificationB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {color: Colors.onPrimaryColor},
  instruction: {
    marginTop: 16,
    paddingHorizontal: 40,
    fontSize: 14,
    color: Colors.onPrimaryColor,
    textAlign: 'center',
    opacity: 0.76,
  },
  codeContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },
  digitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: 43,
    height: 45,
    borderRadius: 4,
    backgroundColor: Color(Colors.onPrimaryColor).alpha(0.84),
  },
  digit: {
    fontWeight: '400',
    fontSize: 17,
    color: Colors.primaryText,
  },
  buttonContainer: {
    marginBottom: 44,
  },
});

// VerificationEMAIL
export default class SMSVerificacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      pin: '',
      confirm:null,
      code:'',
      verificationId:''
    };
  }

  // avoid memory leak
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };



  async componentDidMount() {
    let getNome = this.props.route.params.nome;
    let getEmail = this.props.route.params.email;
    let getSenha = this.props.route.params.senha;
    let getTelefone = this.props.route.params.telefone;
    let getDataNascimento = this.props.route.params.dataNascimento;

  }




  async confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }




  navigateTo = (screen) => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  pressKeyboardButton = (keyboardButton) => () => {
    let {pin} = this.state;

    if (keyboardButton === 'backspace') {
      pin = pin.slice(0, -1);
      this.setState({
        pin,
      });
      return;
    }

    if (keyboardButton === 'skip') {
      Alert.alert(
        'Pular verificação',
        'Tem certeza que quer pular? Não será possível logar depois',
        [
          {text: 'Cancelar', onPress: () => {}, style: 'cancel'},
          {
            text: 'OK',
            onPress: () => {
              this.navigateTo('HomeNavigator');
            },
          },
        ],
        {cancelable: false},
      );
      return;
    }

    if ((pin + keyboardButton).length > 6) {
      return;
    }

    this.setState({
      pin: pin + keyboardButton,
    });
  };

  submit = () => {
    this.setState(
      {
        modalVisible: true,
      },
      () => {
        // for demo purpose after 3s close modal
        this.timeout = setTimeout(() => {
          this.closeModal();
          this.navigateTo('HomeNavigator');
        }, 3000);
      },
    );
  };

  closeModal = () => {
    // for demo purpose clear timeout if user request close modal before 3s timeout
    clearTimeout(this.timeout);
    this.setState({
      modalVisible: false,
      pin: '',
    });
  };

  render() {
    const {modalVisible, pin} = this.state;
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const applicationVerifier = new FirebaseRecaptchaVerifier();

    return (
      <SafeAreaView forceInset={{top: 'never'}} style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <GradientContainer containerStyle={styles.container}>
          <View style={styles.instructionContainer}>
            <Heading5 style={styles.heading}>Aguarde...</Heading5>
            <Paragraph style={styles.instruction}>
                O SMS de confirmação foi enviado com o código de acesso. 
                Ao receber, digite abaixo
            </Paragraph>


            <View style={styles.codeContainer}>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[0]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[1]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[2]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[3]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[4]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[5]}</Text>
              </View>
            </View>

          
          </View>

        

          <View style={{marginBottom: 44}}>
            <Button
              onPress={() => this.confirmCode()}
              disabled={false}
              borderRadius={4}
              color={Colors.onPrimaryColor}
              small
              title={'Confirmar'.toUpperCase()}
              titleColor={Colors.primaryColor}
            />

          </View>
          <NumericKeyboard
            actionButtonTitle="skip"
            onPress={this.pressKeyboardButton}
          />

        </GradientContainer>
      </SafeAreaView>
    );
  }
}
