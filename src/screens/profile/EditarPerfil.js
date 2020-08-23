/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Text
} from 'react-native';
import Color from 'color';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Icon from '../../components/icon/Icon';
import {Subtitle2} from '../../components/text/CustomText';
import Button from '../../components/buttons/Button'
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';

//input mask
import { TextInputMask } from 'react-native-masked-text';

import { PulseIndicator } from 'react-native-indicators';

//import image picker
import * as ImagePicker from 'expo-image-picker';

//import Constants
import Constants from 'expo-constants';

//import Permissions
import * as Permissions from 'expo-permissions';

//import firebase
import firebase from '../../config/firebase';

// import colors
import Colors from '../../theme/colors';

// EditProfileA Config
const AVATAR_SIZE = 100;
const IOS = Platform.OS === 'ios';
const CAMERA_ICON = IOS ? 'ios-camera' : 'md-camera';
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;

// EditProfileA Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatarSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  whiteCircle: {
    marginTop: -18,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  cameraButtonContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primaryColor,
    overflow: 'hidden',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
  },
  editForm: {
    paddingHorizontal: 20,
  },
  overline: {
    color: Color(Colors.secondaryText).alpha(0.6),
    textAlign: 'left',
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 17,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonContainer: {
    paddingVertical: '95%',
    paddingHorizontal: 24,
  },
});

// EditProfileA
export default class EditarPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameFocused: false,
      phone: '',
      phoneFocused: false,
      fotoPerfil:null,
      modalVisible:false
    };
  }



  async componentDidMount() {
      let userUID = firebase.auth().currentUser.uid;

      await firebase.firestore().collection('usuarios').doc(userUID).onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
        this.setState({name: documentSnapshot.data().nome})
        this.setState({phone: documentSnapshot.data().telefone})
        this.setState({fotoPerfil: documentSnapshot.data().photoProfile})
      })
      
      if(userUID == null || userUID == undefined || userUID == ''){
        return null
      }
  }


    makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }


    //sleep function
    sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


  async imagePickerGetPhoto() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Desculpa, nós precisamos do acesso a permissão da câmera');
      }
    }


    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,

      });
      if (!result.cancelled) {
        this.setState({fotoPerfil: result.uri })
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }

  }


  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }


  updateToFirebase() {
    let e = this;
    let userUID = firebase.auth().currentUser.uid;
    let imageIdStorageState = '';
    let imageId = e.makeid(17)


    var getFileBlob = function (url, cb) { 
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.addEventListener('load', function() {
        cb(xhr.response);
      });
      xhr.send();
    }

    if(this.state.fotoPerfil !== null) {
      getFileBlob(this.state.fotoPerfil, blob => {
        firebase.storage().ref(`${userUID}/images/${imageId}`).put(blob).then((snapshot) => {
            imageIdStorageState = imageId
            console.log('A imagem foi salva no Storage!');
            console.log('Valor image state: ' + imageIdStorageState);
        }).catch((error) => {
          console.log('IMAGE UPLOAD ERROR: ' + error)
        })
      })
    } else {
      alert('Por favor, selecione uma imagem para o perfil')
    }


    this.sleep(2000).then(() => { 
      firebase.storage().ref(`${userUID}/images/${imageIdStorageState}`).getDownloadURL().then(function(urlImage) {
        firebase.firestore().collection('usuarios').doc(userUID).update({
          photoProfile: urlImage,
          nome: e.state.name,
          telefone: e.state.phone
        })
      })
    })

    this.setModalVisible(true)

    this.sleep(6000).then(() => { 
      this.props.navigation.navigate('Settings')
    })
  }


  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  nameChange = (text) => {
    this.setState({
      name: text,
    });
  };

  nameFocus = () => {
    this.setState({
      nameFocused: true,
      emailFocused: false,
      phoneFocused: false,
    });
  };

  phoneChange = (text) => {
    this.setState({
      phone: text,
    });
  };

  phoneFocus = () => {
    this.setState({
      nameFocused: false,
      emailFocused: false,
      phoneFocused: true,
    });
  };

  focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  render() {
    const {
      name,
      nameFocused,
      email,
      emailFocused,
      phone,
      phoneFocused,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <KeyboardAwareScrollView enableOnAndroid>

            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
              <View style={{alignItems:'center', paddingTop: '75%', width: '100%'}}>
                <View style={{alignItems:'center', backgroundColor:'white', height:'50%', width:'80%', backgroundColor:'white', borderRadius:15, elevation:50, shadowColor:'black', shadowOffset:{width:20, height:40}, shadowOpacity: 0.1}}>
                  <Text style={{fontWeight:'bold', marginTop:10, color:'#9A9A9A'}}>Atualizando Perfil</Text>
                  <PulseIndicator color='#00b970'/>
                </View>
              </View>
            </Modal>

            {this.state.fotoPerfil == null ?
            <View style={styles.avatarSection}>
              <View>
                <Image
                  source={require('../../assets/img/profile_1.jpeg')}
                  style={{borderRadius:50, width:100, height:100}}
                />

                <View style={styles.whiteCircle}>
                  <View style={styles.cameraButtonContainer}>
                    <TouchableOpacity onPress={() => this.imagePickerGetPhoto()}>
                      <View style={styles.cameraButton}>
                        <Icon 
                          name={CAMERA_ICON}
                          size={16}
                          color={Colors.onPrimaryColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                </View>
              </View>
            : 
              <View style={styles.avatarSection}>
                <Image
                  source={{uri: this.state.fotoPerfil}}
                  style={{borderRadius:50, width:100, height:100}}
                />

                <View style={styles.whiteCircle}>
                  <View style={styles.cameraButtonContainer}>
                    <TouchableOpacity onPress={() => this.imagePickerGetPhoto()}>
                      <View style={styles.cameraButton}>
                        <Icon 
                          name={CAMERA_ICON}
                          size={16}
                          color={Colors.onPrimaryColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            }

          <View style={styles.editForm}>
            <Subtitle2 style={styles.overline}>Nome</Subtitle2>
            <UnderlineTextInput
              onRef={(r) => {
                this.name = r;
              }}
              value={name}
              onChangeText={this.nameChange}
              onFocus={this.nameFocus}
              inputFocused={nameFocused}
              onSubmitEditing={this.focusOn(this.email)}
              returnKeyType="next"
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={styles.inputContainerStyle}
            />

            <Subtitle2 style={styles.overline}>Número de Telefone</Subtitle2>
            <TextInputMask
              type={'cel-phone'}
              inputContainerStyle={styles.inputContainerStyle}
              style={{marginTop:10, borderBottomWidth:1, borderColor:'gray', color:'black'}}
              value={phone}
              onFocus={this.phoneFocus}
              onChangeText={text => this.phoneChange(text)}
              keyboardType={"phone-pad"}
            />

              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.updateToFirebase()}
                  title={'Salvar Mudanças'}
                  height={48}
                  rounded
                />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
