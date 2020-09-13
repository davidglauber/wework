/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


// import components
import ContainedButton from '../../components/buttons/ContainedButton';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

//input mask
import { TextInputMask } from 'react-native-masked-text';


//import icons
import { FontAwesome5 } from '@expo/vector-icons';

//import datepicker
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';


// SignUpB Config
const PLACEHOLDER_TEXT_COLOR = '#DAA520';
const INPUT_TEXT_COLOR = 'black';
const INPUT_BORDER_COLOR = '#DAA520';
const INPUT_FOCUSED_BORDER_COLOR = '#DAA520';

// SignUpB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: {marginBottom: 7},
  vSpacer: {
    height: 15,
  },
  buttonContainer: {
    paddingVertical: 23,
    alignItems:'center'
  },
  buttonsGroup: {
    paddingTop: 23,
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: INPUT_BORDER_COLOR,
  },
  orText: {
    top: -2,
    paddingHorizontal: 8,
    color: PLACEHOLDER_TEXT_COLOR,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: '300',
    fontSize: 13,
    color: "#DAA520",
  },
  footerText2: {
    fontWeight: '300',
    marginTop:10,
    fontSize: 13,
    color: "#DAA520",
  },
  footerLink: {
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

// SignUpB
export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser: '',
      emailFocused: false,
      nome:'', 
      nomeFocused:false,
      date: new Date(),
      showDate: false,
      mode:'date',
      phone: '',
      phoneFocused:false,
      dateFocused: false,
      password: '',
      confirmPassword:'',
      confirmPasswordFocused: false,
      passwordFocused: false,
      secureTextEntry: true,
      secureTextEntry2: true,
    };
  }



  onChange = (event, selectedDate) => {
    this.setState({showDate: false})
    const currentDate = selectedDate || this.state.date;
    this.setState({date: currentDate});
    console.log('data selecionada: ' + currentDate)
    
  };

  showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  emailChange = text => {
    this.setState({
      emailUser: text,
    });

    console.log('email user: ' + this.state.emailUser)
  };

  emailFocus = () => {
    this.setState({
      emailFocused: true,
      nomeFocused: false,
      phoneFocused:false,
      passwordFocused: false
    });
  };

 
  onChangePhone(text) {
    this.setState({phone: text})
    console.log('phone: '  + this.state.phone)
  }

  nomeChange = text => {
    this.setState({
      nome: text,
    });
    console.log('nome user: ' + this.state.nome)
  };

  nomeFocus = () => {
    this.setState({
      nomeFocused: true,
      passwordFocused: false,
      phoneFocused: false,
      emailFocused:false,
    });
  };


  passwordChange = text => {
    this.setState({
      password: text,
    });
    console.log('senha user: ' + this.state.password)
  };

  confirmPasswordChange = text => {
    this.setState({
      confirmPassword: text,
    });
    console.log('confirm senha user: ' + this.state.confirmPassword)
  };

  passwordFocus = () => {
    this.setState({
      passwordFocused: true,
      emailFocused: false,
      nomeFocused:false,
      phoneFocused:false
    });
  };

  confirmPasswordFocus = () => {
    this.setState({
      confirmPasswordFocused: true,
      passwordFocused: false,
      emailFocused: false,
      nomeFocused:false,
      phoneFocused:false
    });
  };

  onTogglePress = () => {
    const {secureTextEntry} = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };

  onTogglePressConfirmPassword = () => {
    const {secureTextEntry2} = this.state;
    this.setState({
      secureTextEntry2: !secureTextEntry2,
    });
  };





  navigateTo = screen => () => {
    let dataAtual = this.convertDate();

    const {navigation} = this.props;

    if(this.state.password !== this.state.confirmPassword){
      alert('As senhas não coincidem')
      } 
      
    if (this.state.password.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres')
    } 

    if (this.state.nome == '' || this.state.email == '' || this.state.password == '' || this.state.confirmPassword == '' || this.state.phone == '') {
      alert('Todos os campos devem ser preenchidos!')
    } 
    
    if(this.state.password == this.state.confirmPassword && this.state.password.length >= 6){  
        navigation.navigate(screen, {
          nome: this.state.nome,
          email: this.state.emailUser,
          senha: this.state.password,
          telefone: this.state.phone,
          dataNascimento: dataAtual
        });
    }
  };


  navigateToSignIn = screen => () => {
    const {navigation} = this.props;
        navigation.navigate(screen);
  };

  navigateToTerms = screen => () => {
    const {navigation} = this.props;
        navigation.navigate(screen);
  };
  

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  convertDate() {
    let day = this.state.date.getDate();
    let month = this.state.date.getMonth() + 1;
    let year = this.state.date.getFullYear();

    let fullDate = day + '/' + month + '/' + year;

    console.log('data escolhida: ' +  fullDate)
    return fullDate;
  }





  render() {
    const {
      emailFocused,
      dateFocused,
      password,
      passwordFocused,
      secureTextEntry,
      secureTextEntry2
    } = this.state;

    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar
          backgroundColor='#fff'
          barStyle="dark-content"
        />

        <SafeAreaView style={styles.screenContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.content}>
              <View />

              <View style={styles.form}>

                <UnderlineTextInput
                  onRef={r => {
                    this.nome = r;
                  }}
                  onChangeText={this.nomeChange}
                  onFocus={this.nomeFocus}
                  inputFocused={this.state.nomeFocused}
                  onSubmitEditing={this.focusOn(this.email)}
                  returnKeyType="next"
                  maxLength={32}
                  autoCapitalize={"words"}
                  blurOnSubmit={false}
                  keyboardType="default"
                  placeholder="Seu nome"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                />

                <UnderlineTextInput
                  onRef={r => {
                    this.emailUser = r;
                  }}
                  onChangeText={this.emailChange}
                  onFocus={this.emailFocus}
                  inputFocused={emailFocused}
                  placeholder="E-mail"
                  keyboardType={"email-address"}
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                />


                <UnderlinePasswordInput
                  onRef={r => {
                    this.password = r;
                  }}
                  onChangeText={this.passwordChange}
                  onFocus={this.passwordFocus}
                  inputFocused={passwordFocused}
                  placeholder="Senha"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  secureTextEntry={secureTextEntry}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  toggleVisible={password.length > 0}
                  toggleText={secureTextEntry ? 'Mostrar' : 'Esconder'}
                  onTogglePress={this.onTogglePress}
                  inputContainerStyle={styles.inputContainer}
                />

                <UnderlinePasswordInput
                  onRef={r => {
                    this.confirmPassword = r;
                  }}
                  onChangeText={this.confirmPasswordChange}
                  onFocus={this.confirmPasswordFocus}
                  inputFocused={this.state.confirmPasswordFocused}
                  placeholder="Confirmar Senha"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  secureTextEntry={secureTextEntry2}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  toggleVisible={password.length > 0}
                  toggleText={secureTextEntry2 ? 'Mostrar' : 'Esconder'}
                  onTogglePress={this.onTogglePressConfirmPassword}
                  inputContainerStyle={styles.inputContainer}
                />

                <TextInputMask
                  type={'cel-phone'}
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  style={{marginTop:10, borderBottomWidth:1, color:'black'}}
                  value={this.state.phone}
                  onChangeText={text => this.onChangePhone(text)}
                  keyboardType={"phone-pad"}
                  placeholder="Número de Telefone"
                />

              
                  <TouchableOpacity style={{width:150, height: 55, alignItems:'center', justifyContent:'center', marginTop: 30, borderRadius:20}} onPress={() => this.setState({showDate: true})}>
                          <Text style={{color: '#DAA520', fontWeight: 'bold', fontSize:12}}>
                            Defina sua Data de Nascimento: {this.convertDate()}
                          </Text>
                  </TouchableOpacity>
               
               { this.state.showDate == true &&
                  <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.date}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="calendar"
                      onChange={this.onChange}
                      
                  />
               }

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={this.navigateTo('Verification')}
                    style={{backgroundColor:'black', width:200, borderRadius:10, height:50, flexDirection:'row', alignItems:'center'}}
                  >
                    <FontAwesome5 name="plus-square" size={35} style={{marginLeft:15}} color="#fff"/>
                    <Text style={{fontWeight:'bold', marginLeft:15, textAlign:'center', fontSize:20, marginTop:4, color:'white'}}>Criar Conta</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={this.navigateToSignIn('SignIn')}>
                      <Text style={[styles.footerText2, styles.footerLink]}>Já tem uma conta? Faça login!</Text>
                  </TouchableOpacity>

                </View>


              </View>

              <TouchableWithoutFeedback
                onPress={this.navigateToTerms('TermsConditions')}>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Se registrando, você aceita nossos
                  </Text>
                  <View style={styles.termsContainer}>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Termos & Condições
                    </Text>
                    <Text style={styles.footerText}> e </Text>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Política de Privacidade
                    </Text>
                    <Text style={styles.footerText}>.</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
