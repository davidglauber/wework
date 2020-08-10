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


//import datepicker
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

//import firebase 
import firebase from '../../config/firebase';


// SignUpB Config
const PLACEHOLDER_TEXT_COLOR = 'rgba(255, 255, 255, 0.7)';
const INPUT_TEXT_COLOR = '#fff';
const INPUT_BORDER_COLOR = 'rgba(255, 255, 255, 0.4)';
const INPUT_FOCUSED_BORDER_COLOR = '#fff';

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
    color: Colors.white,
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
      email: '',
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
      passwordFocused: false,
      secureTextEntry: true,
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
      email: text,
    });

    console.log('email user: ' + this.state.email)
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

  passwordFocus = () => {
    this.setState({
      passwordFocused: true,
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

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  createAccount = () => {
    // const { email, phone, password } = this.state;
    this.setState(
      {
        emailFocused: false,
        passwordFocused: false,
      },
      this.navigateTo('Verification'),
    );
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
    } = this.state;

    return (
      <GradientContainer>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
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
                    this.email = r;
                  }}
                  onChangeText={this.emailChange}
                  onFocus={this.emailFocus}
                  inputFocused={emailFocused}
                  onSubmitEditing={this.focusOn(this.date)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="email-address"
                  placeholder="E-mail"
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
                  onSubmitEditing={this.createAccount}
                  returnKeyType="done"
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


                <TextInputMask
                  type={'cel-phone'}
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  style={{marginTop:10, borderBottomWidth:1, color:'white'}}
                  value={this.state.phone}
                  onChangeText={text => this.onChangePhone(text)}
                  keyboardType={"phone-pad"}
                  placeholder="Número de Telefone"
                />

              
                  <TouchableOpacity style={{width:150, height: 55, alignItems:'center', justifyContent:'center', marginTop: 30, borderRadius:20}} onPress={() => this.setState({showDate: true})}>
                          <Text style={{fontWeight: 'bold', fontSize:12, color:'#fff'}}>
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
                  <ContainedButton
                    onPress={this.createAccount}
                    color={"#70AD66"}
                    title={'Criar Conta'.toUpperCase()}
                  />
                </View>


              </View>

              <TouchableWithoutFeedback
                onPress={this.navigateTo('TermsConditions')}>
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
      </GradientContainer>
    );
  }
}
