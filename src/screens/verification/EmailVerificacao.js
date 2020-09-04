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
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Color from 'color';

// import components
import Button from '../../components/buttons/Button';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import {Heading5, Paragraph} from '../../components/text/CustomText';

// import colors
import Colors from '../../theme/colors';

import { CommonActions } from '@react-navigation/native';

//import firebase 
import firebase from '../../config/firebase';

import { ThemeContext } from '../../../ThemeContext';

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
    width: 48,
    height: 50,
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
export default class EmailVerificacao extends Component {
  static contextType = ThemeContext


  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      email:'',
      nome:'',
      data:'',
      telefone:'',
      senha:''
    };
  }

  

  componentDidMount() {
    let getNome = this.props.route.params.nome;
    let getEmail = this.props.route.params.email;
    let getSenha = this.props.route.params.senha;
    let getTelefone = this.props.route.params.telefone;
    let getDataNascimento = this.props.route.params.dataNascimento;

    
    this.setState({nome: getNome})
    this.setState({email: getEmail})
    this.setState({senha: getSenha})
    this.setState({telefone: getTelefone})
    this.setState({data: getDataNascimento})
    


    
    
    
    
    console.log('email navigation: ' + getEmail)
    console.log('senha navigation: ' + getSenha)
    console.log('nome navigation: ' + getNome)
    console.log('Telefone navigation: ' + getTelefone)
    console.log('Data born navigation: ' + getDataNascimento)
      


    try {
      firebase.auth().createUserWithEmailAndPassword(getEmail, getSenha)
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                try {
                  firebase.auth().currentUser.sendEmailVerification()
                  alert('confirme o codigo enviado')
                } catch {
                  alert('ocorreu um erro ao enviar o email')
                }
            } else { return null }
          })
    } catch {
        alert('erro')          
    }
    
  }











 async verifyIfUserHasVerified(){

  let getNome = this.props.route.params.nome;
  let getEmail = this.props.route.params.email;
  let getSenha = this.props.route.params.senha;
  let getTelefone = this.props.route.params.telefone;
  let getDataNascimento = this.props.route.params.dataNascimento;


    var user = firebase.auth().currentUser;
    user.reload().then(() => {
      if(firebase.auth().currentUser.emailVerified == true) {
         firebase.firestore().collection('usuarios').doc(user.uid).set({
            email: getEmail,
            nome: this.props.route.params.nome,
            premium: false,
            dataNascimento: this.props.route.params.dataNascimento,
            telefone: getTelefone
          })
  
        AsyncStorage.setItem('verified', JSON.stringify(true))
          this.props.navigation.navigate('HomeNavigator')
      } else {
        
        AsyncStorage.setItem('verified', JSON.stringify(false))
        AsyncStorage.setItem('nome', getNome)
        AsyncStorage.setItem('email', getEmail)
        AsyncStorage.setItem('senha', getSenha)
        AsyncStorage.setItem('telefone', getTelefone) 
        AsyncStorage.setItem('dataNascimento', getDataNascimento)

        alert('Você ainda não confirmou o seu cadastro pelo email')
      }
    })
   
  };

  render() {
    return (
      <SafeAreaView forceInset={{top: 'never'}} style={styles.screenContainer}>
        <StatusBar
          backgroundColor={this.context.dark ? '#121212' : 'white'}
          barStyle={this.context.dark ? "white-content" : "dark-content"}
        />

        <GradientContainer containerStyle={styles.container}>
          <View style={styles.instructionContainer}>
            <Heading5 style={styles.heading}>Tudo Certo!</Heading5>
            <Paragraph style={styles.instruction}>
              O email de confirmação foi enviado, confira a caixa de SPAM e caso não tenha recebido o email recadastre-se
            </Paragraph>

          </View>


      
           
          <View style={{marginBottom: 44}}>
            <Button
              onPress={() => this.verifyIfUserHasVerified()}
              disabled={false}
              borderRadius={4}
              color={Colors.onPrimaryColor}
              small
              title={'Acessar Conta'.toUpperCase()}
              titleColor={Colors.primaryColor}
            />
          </View>

        </GradientContainer>
      </SafeAreaView>
    );
  }
}
