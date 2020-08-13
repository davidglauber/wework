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
import { useRoute } from "@react-navigation/native";

//import firebase
import firebase from '../../config/firebase';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaVerifier } from 'expo-firebase-recaptcha';


// import colors
import Colors from '../../theme/colors';
import { TextInput } from 'react-native-gesture-handler';
import { firestore } from 'firebase';

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
export default function SMSVerificacao () {
  const route = useRoute();
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState('+5582991573294');
  const [pin, setPin] = React.useState('');
  const [pin2, setPin2] = React.useState('');
  const [pin3, setPin3] = React.useState('');
  const [pin4, setPin4] = React.useState('');
  const [pin5, setPin5] = React.useState('');
  const [pin6, setPin6] = React.useState('');
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const getNome = route.params.nome;
  const getEmail = route.params.email;
  const getSenha = route.params.senha;
  const getTelefone = route.params.telefone;
  const getDataNascimento = route.params.dataNascimento;



  useEffect(() =>{
    async function SendSMS() {
      try {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
          phoneNumber,
          recaptchaVerifier.current
        );
        setVerificationId(verificationId);
        alert('O código de verificação foi enviado para o seu celular')
      } catch (err) {
        alert('Ocorreu um erro ao enviar o SMS: ' + err)
      }
    }
    SendSMS();
  }, [])




  function navigateTo (screen) {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };



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
            <Heading5 style={styles.heading}>Aguarde...</Heading5>
            <Paragraph style={styles.instruction}>
                O SMS de confirmação foi enviado com o código de acesso. 
                Ao receber, digite abaixo
            </Paragraph>


            <View style={styles.codeContainer}>
              <View style={styles.digitContainer}>
                <TextInput
                  style={styles.digit}
                  maxLength={1}
                  autoFocus={true}
                  keyboardType={'number-pad'}
                  value={pin}
                  onChangeText={(value) => setPin(value)}
                />
              </View>
              <View style={styles.digitContainer}>
                <TextInput
                  style={styles.digit}
                  maxLength={1}
                  keyboardType={'number-pad'}
                  value={pin2}
                  onChangeText={(value) => setPin2(value)}
                />
              </View>
              <View style={styles.digitContainer}>
                <TextInput
                  style={styles.digit}
                  maxLength={1}
                  keyboardType={'number-pad'}
                  value={pin3}
                  onChangeText={(value) => setPin3(value)}
                />
              </View>
              <View style={styles.digitContainer}>
                <TextInput
                  style={styles.digit}
                  maxLength={1}
                  keyboardType={'number-pad'}
                  value={pin4}
                  onChangeText={(value) => setPin4(value)}
                />
              </View>
              <View style={styles.digitContainer}>
                <TextInput
                  style={styles.digit}
                  maxLength={1}
                  value={pin5}
                  keyboardType={'number-pad'}
                  onChangeText={(value) => setPin5(value)}
                />
              </View>
              <View style={styles.digitContainer}>
                <TextInput
                  style={styles.digit}
                  maxLength={1}
                  keyboardType={'number-pad'}
                  value={pin6}
                  onChangeText={(value) => setPin6(value)}
                />
              </View>
            </View>

          
          </View>

        

          <View style={{marginBottom: 44}}>
            <Button
              onPress={async () => {
                try {
                  const credential = firebase.auth.PhoneAuthProvider.credential(
                    verificationId,
                    verificationCode
                  );
                  await firebase.auth().signInWithCredential(credential);
                    var user = firebase.auth().currentUser;
                    firebase.firestore().collection('usuarios').doc(user.uid).set({
                      email: getEmail,
                      nome: getNome,
                      premium: false,
                      dataNascimento: getDataNascimento,
                      telefone: getTelefone
                    })

                  alert('Você foi cadastrado com sucesso 👍')
                } catch (err) {
                  alert('Erro ao confirmar código', err)
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
