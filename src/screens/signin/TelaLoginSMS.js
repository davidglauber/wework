/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, useEffect} from 'react';
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
import Button from '../../components/buttons/Button';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import {Heading5, Paragraph} from '../../components/text/CustomText';
import NumericKeyboard from '../../components/keyboard/NumericKeyboard';
import { useNavigation } from "@react-navigation/native";

//import firebase
import firebase from '../../config/firebase';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaVerifier } from 'expo-firebase-recaptcha';

//input mask
import { TextInputMask } from 'react-native-masked-text';


// import colors
import Colors from '../../theme/colors';
import AsyncStorage from '@react-native-community/async-storage';


const PLACEHOLDER_TEXT_COLOR = 'rgba(255, 255, 255, 0.7)';
const INPUT_BORDER_COLOR = 'rgba(255, 255, 255, 0.4)';

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
    width: 133,
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
export default function TelaLoginSMS () {
  let getPhoneFromAsync = AsyncStorage.getItem('phoneStorage', (err, item) => console.log(item))
  let changePhone = '+55' + getPhoneFromAsync;
  let changePhone2 = changePhone.replace(' ', '');
  let changePhone3 = changePhone2.replace('-', '');
  let changePhone4 = changePhone3.replace('(', '');
  let changePhone5 = changePhone4.replace(')', '');

  const recaptchaVerifier = React.useRef(null);
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState(`${changePhone5}`);
  const [phoneInput, setPhoneInput] = React.useState('');

  let changePhoneInput = '+55' + phoneInput;
  let changePhoneInput2 = changePhoneInput.replace(' ', '');
  let changePhoneInput3 = changePhoneInput2.replace('-', '');
  let changePhoneInput4 = changePhoneInput3.replace('(', '');
  let changePhoneInput5 = changePhoneInput4.replace(')', '');

  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;



  useEffect(() => {
    console.log('telefone do asyncstorage: ' + phoneNumber)
    console.log('telefone do estado: ' + phoneInput)
  },[phoneInput])


    return (
      <SafeAreaView forceInset={{top: 'never'}} style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
        <GradientContainer containerStyle={styles.container}>
          <View style={styles.instructionContainer}>
            <Heading5 style={styles.heading}>Digite o seu Número para Logar</Heading5>
            <Paragraph style={styles.instruction}>
                Assim que confirmado, você entrará na sua conta
            </Paragraph>


            <View style={styles.codeContainer}>
              <View style={styles.digitContainer}>
                <TextInputMask
                  type={'cel-phone'}
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  style={{padding:4, color:'gray'}}
                  value={phoneInput}
                  onChangeText={setPhoneInput}
                  placeholderTextColor={'gray'}
                  keyboardType={"phone-pad"}
                  placeholder="Tel Numero"
                />
              </View>
            </View>

          
          </View>

        

          <View style={{marginBottom: 44}}>
            <Button
              onPress={async () => {
                try {
                  if(phoneInput == phoneNumber) {
                      console.log('ENTROU NO VERIFICATION')
                    await firebase.auth().signInWithCredential(phoneNumber).then(() => {
                        alert('Logado com sucesso')
                        navigation.navigate('HomeNavigator')
                    }).catch((err) => {
                        console.log(err)
                    })
                  }
                } catch (err) {
                  alert('Erro ao logar com celular', err)
                }
              }}
              disabled={false}
              borderRadius={4}
              color={Colors.onPrimaryColor}
              small
              title={'Confirmar'.toUpperCase()}
              titleColor={Colors.primaryColor}
            />

          </View>
        </GradientContainer>
      </SafeAreaView>
    );
  }
