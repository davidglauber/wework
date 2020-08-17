/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import node modules
import React, {Component, Fragment} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  View,
  Text,
  YellowBox
} from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);

import {Subtitle2} from '../../components/text/CustomText';
import { Modalize } from 'react-native-modalize';
import Layout from '../../theme/layout';

//import firebase
import firebase from '../../config/firebase';

//import image picker
import * as ImagePicker from 'expo-image-picker';

//import Constants
import Constants from 'expo-constants';

//import Permissions
import * as Permissions from 'expo-permissions';

import {Heading6} from '../../components/text/CustomText';

import { PulseIndicator } from 'react-native-indicators';

// import components
import OrderItem from '../../components/cards/OrderItemB';
import { FontAwesome5 } from '@expo/vector-icons';

import { TextInputMask } from 'react-native-masked-text';

// import colors
import Colors from '../../theme/colors';

// OrdersB Styles
const styles = StyleSheet.create({
  topArea: {flex: 0, backgroundColor: Colors.primaryColor},
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  productsContainer: {
    paddingVertical: 8,
  },
  circleMask: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#efefef',
  },
  leftCircle: {
    left: -9,
  },
  rightCircle: {
    right: -9,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#efefef',
  },
  itemContainer: {
    marginVertical: 4,
    backgroundColor: Colors.background,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 36,
  },

  inputStyle: {
    borderBottomWidth:0.5,

  }
});

// OrdersB
export default class CriarAnuncio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Estabelecimento',
      categorias: [],
      categoria:'',
      horarioOpen:'',
      horarioClose:'',
      phoneAuto:'',
      phoneEstab:'',
      precoAuto:'',
      precoEstab:'',
      nomeAuto:'',
      tituloAuto:'',
      tituloEstab:'',
      descricaoAuto:'',
      descricaoEstab:'',
      enderecoEstab:'',
      segunda:false,
      terca:false, 
      quarta:false,
      quinta:false,
      sexta:false,
      sabado:false,
      domingo:false,
      modalizeRef: React.createRef(null),
      modalizeRefAbertura: React.createRef(null),
      modalizeRefFechamento: React.createRef(null),
      image:null,
      imageName:'',
      animated: true,
      modalVisible: false
    };
  }





  async componentDidMount() {
    let e = this;

    //getting categories
    await firebase.firestore().collection('categorias').get().then(function(querySnapshot) {
      let categoriaDidMount = []
      querySnapshot.forEach(function(doc) {
        categoriaDidMount.push({
          id: doc.data().id,
          title: doc.data().title
        })
      })
      e.setState({categorias: categoriaDidMount})
    })

    console.log('state de categorias: ' + this.state.categorias)

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




  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  keyExtractor = item => item.orderNumber.toString();

  onChangePhoneAuto(text) {
    this.setState({phoneAuto: text})
    console.log('auto phone: '  + this.state.phoneAuto)
  }

  onChangePhoneEstab(text) {
    this.setState({phoneEstab: text})
    console.log('estab phone: '  + this.state.phoneEstab)
  }

  onChangePrecoAuto(text) {
    this.setState({precoAuto: text})
    console.log('preco auto'  + this.state.precoAuto)
  }

  onChangePrecoEstab(text) {
    this.setState({precoEstab: text})
    console.log('preco estab'  + this.state.precoEstab)
  }

  onChangeTituloAuto(text) {
    this.setState({tituloAuto: text})
    console.log('title auto'  + this.state.tituloAuto)
  }

  onChangeTituloEstab(text) {
    this.setState({tituloEstab: text})
    console.log('title estab'  + this.state.tituloEstab)
  }

  onChangeDescricaoAuto(text) {
    this.setState({descricaoAuto: text})
    console.log('descricao auto'  + this.state.descricaoAuto)
  }

  onChangeDescricaoEstab(text) {
    this.setState({descricaoEstab: text})
    console.log('descricao estab'  + this.state.descricaoEstab)
  }

  onChangeNomeAuto(text) {
    this.setState({nomeAuto: text})
    console.log('nome auto'  + this.state.nomeAuto)
  }

  onChangeEnderecoEstab(text) {
    this.setState({enderecoEstab: text})
    console.log('endereco estab'  + this.state.enderecoEstab)
  }


  openModalize() {
    const modalizeRef = this.state.modalizeRef;

    modalizeRef.current?.open()
  }


  openModalizeAbertura() {
    const modalizeRefAbertura = this.state.modalizeRefAbertura;

    modalizeRefAbertura.current?.open()
  }

  openModalizeFechamento() {
    const modalizeRefFechamento = this.state.modalizeRefFechamento;

    modalizeRefFechamento.current?.open()
  }


  getCategory(param) {
    const modalizeRef = this.state.modalizeRef;
    this.setState({categoria: param})
    modalizeRef.current?.close()

    console.log('Categoria Selecionada: '  + param)
  }

  getHorarioOpen(param) {
    const modalizeRefAbertura = this.state.modalizeRefAbertura;
    this.setState({horarioOpen: param})
    modalizeRefAbertura.current?.close()

    console.log('Horario open Selecionado: '  + param)

  }

  getHorarioClose(param) {
    const modalizeRefFechamento = this.state.modalizeRefFechamento;
    this.setState({horarioClose: param})
    modalizeRefFechamento.current?.close()

    console.log('Horario close Selecionado: '  + param)
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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,

      });
      if (!result.cancelled) {
        this.setState({ image: result.uri })
        this.setState({imageName: result.uri})
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }

  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }



  uploadFormToFirebase() {
    let segunda = this.state.segunda;
    let terca = this.state.terca;
    let quarta = this.state.quarta;
    let quinta = this.state.quinta;
    let sexta = this.state.sexta;
    let sabado = this.state.sabado;
    let domingo = this.state.domingo;
    let e = this;


    let imageId = e.makeid(17)
    let userUID = firebase.auth().currentUser.uid;
    let storageUrl = userUID;
    let type = this.state.type;
    let imageIdStorageState = '';

      var getFileBlob = function (url, cb) { 
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.addEventListener('load', function() {
            cb(xhr.response);
          });
          xhr.send();
      }
      
      if(this.state.image !== null) {
        getFileBlob(this.state.image, blob => {
          firebase.storage().ref(`${storageUrl}/images/${imageId}`).put(blob).then((snapshot) => {
              imageIdStorageState = imageId
              console.log('A imagem foi salva no Storage!');
              console.log('Valor image state: ' + imageIdStorageState);
          }).catch((error) => {
            console.log('IMAGE UPLOAD ERROR: ' + error)
          })
        })
      } else {
        alert('Por favor, selecione uma imagem para o anúncio')
      }

        

    if(type == 'Estabelecimento'){
      if(this.state.tituloEstab !== '' || this.state.descricaoEstab !== '' || this.state.precoEstab !== '' || this.state.phoneEstab !== '' || this.state.enderecoEstab !== '' || this.state.horarioOpen !== '' || this.state.horarioClose !== '' || this.state.categoria !== '' || this.state.segunda !== false || this.state.terca !== false || this.state.quarta !== false || this.state.quinta !== false || this.state.sexta !== false || this.state.sabado !== false || this.state.domingo !== false || this.state.image !== null) {
        this.sleep(2000).then(() => { 
          firebase.storage().ref(`${storageUrl}/images/${imageIdStorageState}`).getDownloadURL().then(function(urlImage) {
          firebase.firestore().collection('usuarios').doc(userUID).collection('anuncios').doc().set({
              titleEstab: e.state.tituloEstab,
              idUser: userUID,
              descriptionEstab: e.state.descricaoEstab,
              valueServiceEstab: e.state.precoEstab,
              type: 'Estabelecimento',
              verifiedPublish: false,
              phoneNumberEstab: e.state.phoneEstab,
              localEstab: e.state.enderecoEstab,
              categoryEstab: e.state.categoria,
              photoPublish: urlImage,
              workDays: segunda + terca + quarta + quinta + sexta + sabado + domingo,
              timeOpen: e.state.horarioOpen,
              timeClose: e.state.horarioClose
            })
          }).catch(function(error) {
            console.log('ocorreu um erro ao carregar a imagem: ' + error.message)
          })

        })

        this.sleep(4000).then(() => { 
          this.setModalVisible(true)
        })

        this.sleep(6000).then(() => { 
          this.props.navigation.navigate('TelaPrincipalAnuncio')
        })

      } else {
        alert('Todos os campos devem ser preenchidos!')
      }
    }


    if(type == 'Autonomo') {
      if(this.state.tituloAuto !== '' || this.state.descricaoAuto !== '' || this.state.precoAuto !== '' || this.state.phoneAuto !== '' || this.state.categoria !== '' || this.state.segunda !== false || this.state.terca !== false || this.state.quarta !== false || this.state.quinta !== false || this.state.sexta !== false || this.state.sabado !== false || this.state.domingo !== false || this.state.image !== null || this.state.nomeAuto !== '') {
        this.sleep(2000).then(() => { 
          firebase.storage().ref(`${storageUrl}/images/${imageIdStorageState}`).getDownloadURL().then(function(urlImage) {
          firebase.firestore().collection('usuarios').doc(userUID).collection('anuncios').doc().set({
              titleAuto: e.state.tituloAuto,
              idUser: userUID,
              descriptionAuto: e.state.descricaoAuto,
              valueServiceAuto: e.state.precoAuto,
              type: 'Autonomo',
              verifiedPublish: false,
              phoneNumberAuto: e.state.phoneAuto,
              categoryAuto: e.state.categoria,
              photoPublish: urlImage,
            })
          }).catch(function(error) {
            console.log('ocorreu um erro ao carregar a imagem: ' + error.message)
          })
        })

          this.sleep(4000).then(() => { 
            this.setModalVisible(true)
          })

          this.sleep(6000).then(() => { 
            this.props.navigation.navigate('TelaPrincipalAnuncio')
          })
      } else {
        alert('Todos os campos devem ser preenchidos!')
      }
      
    }

  }



  render() {
    const { categorias, categoria } = this.state
    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={'white'}
            barStyle="dark-content"

          />

          <View style={styles.container}>
            <View style={{ marginVertical: 4,
            marginHorizontal: 12,
            borderRadius: 16,
            backgroundColor: Colors.background}}>
              
            <View style={{ width: Layout.SCREEN_WIDTH - 2 * 12}}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',padding: 16}}>
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
                          <Text style={{fontWeight:'bold', marginTop:10, color:'#9A9A9A'}}>Enviando o Seu Anúncio para a Análise</Text>
                          <PulseIndicator color='#00b970'/>
                        </View>
                      </View>
                    </Modal>
                        
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          { this.state.type == 'Estabelecimento' ?
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{backgroundColor:'#70AD66', width:18, height:18, borderRadius:30}}/>
                                <TouchableOpacity>
                                    <Subtitle2
                                      style={{marginLeft: 5, paddingBottom: 2, fontWeight: 'bold', color: Colors.primaryColorDark, textAlign: 'left'}}>Estabelecimento</Subtitle2>
                                </TouchableOpacity>
                            </View>
                          :
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => this.setState({type: 'Estabelecimento'})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30}}/>
                                  <TouchableOpacity onPress={() => this.setState({type: 'Estabelecimento'})}>
                                      <Subtitle2
                                        style={{marginLeft: 5, paddingBottom: 2, fontWeight: '100', color: Colors.primaryColorDark, textAlign: 'left'}}>Estabelecimento</Subtitle2>
                                  </TouchableOpacity>
                            </View>                         
                          }
                        </View>


                        {this.state.image == null ?
                          <View>
                            <TouchableOpacity onPress={() => this.imagePickerGetPhoto()} style={{alignItems:'center', justifyContent:'center', backgroundColor:'#E3E3E3', width:40, height:40, borderRadius:30}}>
                                <FontAwesome5 name="camera-retro" size={24} color={'#9A9A9A'}/>
                            </TouchableOpacity>
                          </View> 
                          :
                          <View>
                            <TouchableOpacity onPress={() => this.imagePickerGetPhoto()} style={{alignItems:'center', justifyContent:'center', backgroundColor:'#E3E3E3', width:40, height:40, borderRadius:30}}>
                                <Image style={{alignItems:'center', justifyContent:'center', backgroundColor:'#E3E3E3', width:40, height:40, borderRadius:30}} source={{uri: this.state.image}}/>
                            </TouchableOpacity>
                          </View>
                        }
              </View>

                     {this.state.type == 'Autonomo' ?     
                      <View style={{flexDirection:'row', padding: 16}}>
                              <TouchableOpacity  style={{backgroundColor:'#70AD66', width:18, height:18, borderRadius:30}}/>
                                  <TouchableOpacity>
                                      <Subtitle2
                                        style={{marginLeft: 5, paddingBottom: 2, fontWeight: 'bold', color: Colors.primaryColorDark, textAlign: 'left'}}>Autônomo</Subtitle2>
                                  </TouchableOpacity>
                      </View>
                      :
                      <View style={{flexDirection:'row', padding: 16}}>
                              <TouchableOpacity onPress={() => this.setState({type: 'Autonomo'})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30}}/>
                              <TouchableOpacity onPress={() => this.setState({type: 'Autonomo'})}>
                                  <Subtitle2
                                      style={{marginLeft: 5, paddingBottom: 2, fontWeight: '100', color: Colors.primaryColorDark, textAlign: 'left'}}>Autônomo</Subtitle2>
                              </TouchableOpacity>
                      </View>
                     }
                    </View>



                    {/*Divisor estiloso*/}
                    <View style={{ flex: 1,  flexDirection: 'row',  justifyContent: 'space-between',alignItems: 'center'}}>
                      <View style={[styles.circleMask, styles.leftCircle]} />
                      <View style={styles.dividerLine} />
                      <View style={[styles.circleMask, styles.rightCircle]} />
                    </View>



                    <View style={styles.itemContainer}>

                      { this.state.type == 'Autonomo' &&
                        <View>
                          <View style={styles.item}>
                              <TextInput
                                style={styles.inputStyle}
                                value={this.state.tituloAuto}
                                onChangeText={text => this.onChangeTituloAuto(text)}
                                maxLength={21}
                                placeholder="Título Breve do Anúncio                                                        "
                              />
                          </View>

                          <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <TextInput
                                value={this.state.descricaoAuto}
                                onChangeText={text => this.onChangeDescricaoAuto(text)}
                                style={styles.inputStyle}
                                placeholder="Descrição do Anúncio                                                    "
                              />
                          </View>

                          <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <TextInputMask
                                type={'money'}
                                style={styles.inputStyle}
                                value={this.state.precoAuto}
                                onChangeText={text => this.onChangePrecoAuto(text)}
                                keyboardType={"number-pad"}
                                placeholder="Valor do Serviço                                                          "
                              />
                          </View>

                          <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <TextInput
                                style={styles.inputStyle}
                                value={this.state.nomeAuto}
                                onChangeText={text => this.onChangeNomeAuto(text)}
                                autoCapitalize={'words'}
                                placeholder="Seu nome                                                                       "
                              />
                          </View>

                          <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <TextInputMask
                                type={'cel-phone'}
                                style={styles.inputStyle} 
                                keyboardType={"phone-pad"}
                                maxLength={17}
                                value={this.state.phoneAuto}
                                onChangeText={text => this.onChangePhoneAuto(text)}
                                placeholder="Número de Telefone                                                   "
                              />
                          </View>

                      </View>
                      }
                        {this.state.type == 'Estabelecimento' &&
                          <View>
                            <View style={styles.item}>
                              <TextInput
                                style={styles.inputStyle}
                                value={this.state.tituloEstab}
                                onChangeText={text => this.onChangeTituloEstab(text)}
                                maxLength={21}
                                placeholder="Título Breve do Anúncio                                                        "
                              />
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <TextInput
                                style={styles.inputStyle}
                                value={this.state.descricaoEstab}
                                onChangeText={text => this.onChangeDescricaoEstab(text)}
                                placeholder="Descrição do Anúncio                                                    "
                              />
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <TextInputMask
                                type={'money'}
                                style={styles.inputStyle}
                                value={this.state.precoEstab}
                                onChangeText={text => this.onChangePrecoEstab(text)}
                                keyboardType={"number-pad"}
                                placeholder="Valor do Serviço                                                          "
                              />
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <TextInputMask
                                type={'cel-phone'}
                                style={styles.inputStyle} 
                                keyboardType={"phone-pad"}
                                maxLength={17}
                                value={this.state.phoneEstab}
                                onChangeText={text => this.onChangePhoneEstab(text)}
                                placeholder="Número de Telefone                                                   "
                              />
                            </View>
                          
                            <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                                <TextInput
                                  style={styles.inputStyle}
                                  value={this.state.enderecoEstab}
                                  onChangeText={text => this.onChangeEnderecoEstab(text)}
                                  keyboardType={"default"}
                                  placeholder="Endereço do Estabelecimento                                                   "
                                />
                            </View>

                            <View>

                              <View style={{flexDirection:'row'}}>
                                
                                { this.state.segunda == false ?
                                    <View style={{flexDirection:'row'}}>
                                      <TouchableOpacity onPress={() => this.setState({segunda: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                      <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Seg</Text>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                      <TouchableOpacity onPress={() => this.setState({segunda: false})} style={{backgroundColor:'#70AD66', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                      <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Seg</Text>
                                    </View>
                                }

                                { this.state.terca == false ?
                                    <View style={{flexDirection:'row'}}>
                                      <TouchableOpacity onPress={() => this.setState({terca: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                      <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Ter</Text>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                      <TouchableOpacity onPress={() => this.setState({terca: false})} style={{backgroundColor:'#70AD66', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                      <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Ter</Text>
                                    </View>
                                }


                                { this.state.quarta == false ?
                                    <View style={{flexDirection:'row'}}>
                                      <TouchableOpacity onPress={() => this.setState({quarta: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                      <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Qua</Text>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                      <TouchableOpacity onPress={() => this.setState({quarta: false})} style={{backgroundColor:'#70AD66', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                      <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Qua</Text>
                                    </View>
                                }
                              </View>

                              <View style={{flexDirection:'row'}}>
                                { this.state.quinta == false ?
                                  <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => this.setState({quinta: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                    <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Qui</Text>
                                  </View>

                                :
                                  <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => this.setState({quinta: false})} style={{backgroundColor:'#70AD66', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                    <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Qui</Text>
                                  </View>
                                }

                                { this.state.sexta == false ?
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity onPress={() => this.setState({sexta: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                        <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Sex</Text>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity onPress={() => this.setState({sexta: false})} style={{backgroundColor:'#70AD66', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                        <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Sex</Text>
                                    </View>
                                }


                                { this.state.sabado == false ?
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity onPress={() => this.setState({sabado: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                        <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Sáb</Text>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity onPress={() => this.setState({sabado: false})} style={{backgroundColor:'#70AD66', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                        <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Sáb</Text>
                                    </View>
                                }
                              </View>

                            <View style={{flexDirection:'row'}}>
                                { this.state.domingo == false ?
                                  <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => this.setState({domingo: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                    <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Dom</Text>
                                  </View>
                                  :
                                  <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => this.setState({domingo: false})} style={{backgroundColor:'#70AD66', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                    <Text style={{color:Colors.primaryColorDark,  fontWeight:'800', paddingTop:20, paddingLeft: 5}}>Dom</Text>
                                  </View>
                                }
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <View>
                                <Text style={{color:Colors.primaryColorDark,  fontWeight:'bold', paddingLeft: 15, marginTop:20}}>Horário de Abertura</Text>
                                  <View style={{marginLeft:14, width: 130, height:30}}>
                                      <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:4}} onPress={() => this.openModalizeAbertura()}> 
                                        <FontAwesome5 name="clock" size={24} color={'#9A9A9A'}/>
                                        {this.state.horarioOpen == '' ? 
                                          <Text style={{color:'#9A9A9A', fontWeight:'bold', marginLeft:5}}>Abertura</Text> 
                                        : <Text style={{color:'#9A9A9A', fontWeight:'bold', marginLeft:5}}>{this.state.horarioOpen}</Text> 
                                        }
                                      </TouchableOpacity>
                                  </View>
                              </View>

                                <View>
                                  <Text style={{color:Colors.primaryColorDark,  fontWeight:'bold', paddingLeft: 35, marginTop:20}}>Horário de Fechamento</Text>
                                    <View style={{marginLeft:44, width: 130, height:30}}>
                                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:4}} onPress={() => this.openModalizeFechamento()}> 
                                          <FontAwesome5 name="stopwatch" size={24} color={'#9A9A9A'}/>
                                          {this.state.horarioClose == '' ?
                                            <Text style={{color:'#9A9A9A', fontWeight:'bold', marginLeft:5}}>Fechamento</Text>
                                          : <Text style={{color:'#9A9A9A', fontWeight:'bold', marginLeft:5}}>{this.state.horarioClose}</Text>
                                          }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                              
                            </View>


                          </View>

                        }



                        <View style={{flexDirection:'row', paddingTop:50, paddingBottom:10, alignItems:'center', justifyContent:'center'}}>                          
                            <View style={{marginRight:70}}>
                              <TouchableOpacity onPress={() => this.openModalize()} style={{justifyContent:'center', alignItems:'center', flexDirection:'row', marginLeft:8, marginRight:5, borderRadius:10}}>
                                {this.state.categoria == '' ?
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <FontAwesome5 name="align-left" size={24} color={'#70AD66'}/>
                                    <Text style={{ marginLeft:10, fontWeight:'bold', color:'#70AD66'}}>Categoria</Text>
                                </View>
                                :
                                <View style={{flexDirection:'row', alignItems:'center', marginLeft:50}}>
                                    <FontAwesome5 name="align-left" size={24} color={'#70AD66'}/>
                                    <Text style={{ marginLeft:10, fontWeight:'bold', color:'#70AD66'}}>Selecionada ;)</Text>
                                </View>
                                }
                              </TouchableOpacity>
                            </View>
                            
                            {this.state.categoria !== '' ?
                              <TouchableOpacity onPress={() => this.uploadFormToFirebase()} style={{backgroundColor:'#70AD66', width:100, height:30, borderRadius:30, marginRight:50}}>
                                <Text style={{color:'#fff', fontWeight:'bold', paddingTop:5, paddingLeft:20}}>
                                  Publicar
                                </Text>
                              </TouchableOpacity>
                              :
                              <TouchableOpacity onPress={() => this.uploadFormToFirebase()} style={{backgroundColor:'#70AD66', width:100, height:30, borderRadius:30}}>
                                <Text style={{color:'#fff', fontWeight:'bold', paddingTop:5, paddingLeft:20}}>
                                  Publicar
                                </Text>
                              </TouchableOpacity>
                            }
                        </View>
                    </View>

            </View>
          </View>

          {/*Modalize da categoria*/}
          <Modalize
            ref={this.state.modalizeRef}
            snapPoint={500}
          >
            <View style={{alignItems:'flex-start', marginTop:40}}>
            <Heading6 style={{fontWeight:'bold', marginLeft: 10}}>Selecione a Categoria Desejada</Heading6>
              {categorias.map(l => (
                <View>
                  <TouchableOpacity key={l.id} onPress={() => this.getCategory(l.title)}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>{l.title}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Modalize>



          {/*Modalize do horario de abertura*/}
          <Modalize
            ref={this.state.modalizeRefAbertura}
            snapPoint={500}
          >
            <View style={{alignItems:'flex-start', marginTop:40}}>
            <Heading6 style={{fontWeight:'bold', marginLeft: 10}}>Selecione o Horário de Abertura</Heading6>
                <View>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('1:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>1:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('2:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>2:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('3:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>3:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('4:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>4:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('5:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>5:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('6:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>6:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('7:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>7:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('8:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>8:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('9:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>9:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('10:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>10:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('11:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>11:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('12:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>12:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('13:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>13:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('14:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>14:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('15:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>15:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('16:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>16:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('17:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>17:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('18:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>18:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('19:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>19:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('20:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>20:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('21:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>21:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('22:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>22:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('23:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>23:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('00:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>00:00</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </Modalize>




           {/*Modalize do horario de FECHAMENTO*/}
           <Modalize
            ref={this.state.modalizeRefFechamento}
            snapPoint={500}
          >
            <View style={{alignItems:'flex-start', marginTop:40}}>
            <Heading6 style={{fontWeight:'bold', marginLeft: 10}}>Selecione o Horário de Fechamento</Heading6>
                <View>

                  <TouchableOpacity onPress={() => this.getHorarioClose('1:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>1:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('2:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>2:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('3:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>3:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('4:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>4:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('5:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>5:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('6:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>6:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('7:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>7:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('8:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>8:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('9:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>9:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('10:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>10:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('11:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>11:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('12:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>12:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('13:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>13:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('14:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>14:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('15:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>15:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('16:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>16:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('17:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>17:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('18:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>18:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('19:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>19:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('20:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>20:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('21:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>21:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('22:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>22:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('23:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>23:00</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('00:00')}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:20, marginLeft:17, marginTop:10, marginBottom:15}}>00:00</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </Modalize>
        </SafeAreaView>
      </Fragment>
    );
  }
}
