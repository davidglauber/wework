/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import node modules
import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
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
import { FontAwesome5 } from '@expo/vector-icons';

import { TextInputMask } from 'react-native-masked-text';

import { ItemContainer, ViewTopForm, SafeBackgroundPublish, IconResponsive, PublishTouchable, CategoryAndSub, TextDays, TitleChangeColor, InputFormMask, InputForm, SafeViewPublish, Subtitle2Publish, ViewCircle, ChooseOption } from '../home/styles';

import { ThemeContext } from '../../../App';

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
export default class EditarAnuncio extends Component {
  static contextType = ThemeContext

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
      modalizeRefDescription: React.createRef(null),
      modalizeRefDescriptionEstab: React.createRef(null),
      modalizeRefSub: React.createRef(null),
      modalizeRefAbertura: React.createRef(null),
      modalizeRefFechamento: React.createRef(null),
      image:null,
      imageName:'',
      animated: true,
      modalVisible: false,
      modalLoadVisible: false,
      idAnuncio: '',
      currentDate: new Date(),
      date: '',
      subcategorias:[],
      subcategoria:''
    };
  }


  convertDate() {
    let day = this.state.currentDate.getDate();
    let month = this.state.currentDate.getMonth() + 1;
    let year = this.state.currentDate.getFullYear();
    let fullDate = day + '/' + month + '/' + year;

    this.setState({date: fullDate});
  }



  async componentDidMount() {
    this.convertDate();

    let e = this;
    let routeType = this.props.route.params.type;
    let routeIdAnuncio = this.props.route.params.idAnuncio;
    let userUID = firebase.auth().currentUser.uid;


    this.setModalLoadVisible(true)

    this.sleep(2000).then(() => { 
        this.setModalLoadVisible(false)
    })

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


    if(routeType == 'Autonomo') { 
        this.setState({type: 'Autonomo'})
        await firebase.firestore().collection('usuarios').doc(userUID).collection('anuncios').where("idAnuncio", "==", routeIdAnuncio).get().then(function(querySnapshot) {
            let idAnuncio = ''
            let categoria = ''
            let subcategoria = ''
            let descricao = ''
            let idUser = ''
            let nome = ''
            let telefone = ''
            let valor = ''
            let imagem = ''
            let titulo = ''
            let type = ''
            let verificado = false

            querySnapshot.forEach(function(doc) {
                idAnuncio = doc.data().id,
                titulo = doc.data().titleAuto,
                categoria = doc.data().categoryAuto,
                subcategoria = doc.data().subcategoryAuto,
                descricao = doc.data().descriptionAuto,
                idUser = doc.data().idUser,
                nome = doc.data().nome
                telefone = doc.data().phoneNumberAuto,
                valor = doc.data().valueServiceAuto,
                type = doc.data().type,
                imagem = doc.data().photoPublish,
                verificado = false
            })

            e.setState({idAnuncio: idAnuncio})
            e.setState({tituloAuto: titulo})
            e.setState({descricaoAuto: descricao})
            e.setState({categoria: categoria})
            e.setState({subcategoria: subcategoria})
            e.setState({precoAuto: valor})
            e.setState({nomeAuto: nome})
            e.setState({type: type})
            e.setState({phoneAuto: telefone})
            e.setState({image: imagem})
        })

    }


    if(routeType == 'Estabelecimento') { 
        this.setState({type: 'Estabelecimento'})
        await firebase.firestore().collection('usuarios').doc(userUID).collection('anuncios').where("idAnuncio", "==", routeIdAnuncio).get().then(function(querySnapshot) {
            let idAnuncio = ''
            let categoria = ''
            let subcategoria = ''
            let descricao = ''
            let idUser = ''
            let telefone = ''
            let valor = ''
            let imagem = ''
            let titulo = ''
            let verificado = false
            let local = ''
            let abertura = ''
            let fechamento = ''
            let workDays = ''
            let type = ''

            querySnapshot.forEach(function(doc) {
                idAnuncio = doc.data().id,
                titulo = doc.data().titleEstab,
                categoria = doc.data().categoryEstab,
                subcategoria = doc.data().subcategoryEstab,
                descricao = doc.data().descriptionEstab,
                idUser = doc.data().idUser,
                telefone = doc.data().phoneNumberEstab,
                valor = doc.data().valueServiceEstab,
                imagem = doc.data().photoPublish,
                verificado = false,
                type = doc.data().type,
                local = doc.data().localEstab,
                abertura = doc.data().timeOpen,
                fechamento = doc.data().timeClose,
                workDays = doc.data().workDays
            })

            e.setState({idAnuncio: idAnuncio})
            e.setState({tituloEstab: titulo})
            e.setState({descricaoEstab: descricao})
            e.setState({categoria: categoria})
            e.setState({subcategoria: subcategoria})
            e.setState({precoEstab: valor})
            e.setState({phoneEstab: telefone})
            e.setState({image: imagem})
            e.setState({type: type})
            e.setState({enderecoEstab: local})
            e.setState({horarioOpen: abertura})
            e.setState({horarioClose: fechamento})
            e.setState({workDays: workDays})
        })

    }

    console.log('state de categorias: ' + this.state.categorias)
    console.log('id do  anuncio: ' + this.props.route.params.idAnuncio)
    console.log('type do  anuncio: ' + this.props.route.params.type)

  }


  async getSubCategoryFromFirebase(id, title) {
    let e = this;
    
    //getting subcategories
    await firebase.firestore().collection('categorias').doc(id).collection(title).get().then(function(querySnapshot){
      let subcategoriasDidMount = [];
      querySnapshot.forEach(function(doc) {
        subcategoriasDidMount.push({
          id: doc.data().id,
          title: doc.data().title
        })
        console.log('SUBCATEGORIA:' + doc.data().title)
      })
      e.setState({subcategorias: subcategoriasDidMount})
    })
    console.log('state de SUBcategorias: ' + this.state.subcategorias)
    console.log('SUBcategoria obtida: ' + title)

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


  openModalizeDescricao() {
    const modalizeRefDescription = this.state.modalizeRefDescription;

    modalizeRefDescription.current?.open()
  }

  openModalizeDescricaoEstab() {
    const modalizeRefDescriptionEstab = this.state.modalizeRefDescriptionEstab;

    modalizeRefDescriptionEstab.current?.open()
  }



  openModalizeSubCategoria() {
    const modalizeRefSub = this.state.modalizeRefSub;

    modalizeRefSub.current?.open()
  }


  openModalizeAbertura() {
    const modalizeRefAbertura = this.state.modalizeRefAbertura;

    modalizeRefAbertura.current?.open()
  }

  openModalizeFechamento() {
    const modalizeRefFechamento = this.state.modalizeRefFechamento;

    modalizeRefFechamento.current?.open()
  }


  getCategory(id, param) {
    const modalizeRef = this.state.modalizeRef;
    this.setState({categoria: param})
    modalizeRef.current?.close()

    this.getSubCategoryFromFirebase(id, param)

    this.openModalizeSubCategoria()
    console.log('Categoria Selecionada: '  + param)
  }

  getSubCategory(param) {
    const modalizeRefSub = this.state.modalizeRefSub;
    this.setState({subcategoria: param})
    modalizeRefSub.current?.close()

    console.log('SUBCATEGORIA Selecionada: '  + param)
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

  setModalLoadVisible = (visible) => {
    this.setState({ modalLoadVisible: visible });
  }



  closeDescriptionModal(){
    const modalizeRefDescription = this.state.modalizeRefDescription;

    modalizeRefDescription.current?.close()
  }

  closeDescriptionEstabModal(){
    const modalizeRefDescriptionEstab = this.state.modalizeRefDescriptionEstab;

    modalizeRefDescriptionEstab.current?.close()
  }




  uploadFormToFirebase() {
    let routeIdAnuncio = this.props.route.params.idAnuncio;
    let segunda = this.state.segunda;
    let terca = this.state.terca;
    let quarta = this.state.quarta;
    let quinta = this.state.quinta;
    let sexta = this.state.sexta;
    let sabado = this.state.sabado;
    let domingo = this.state.domingo;
    let e = this;

    let publishId = e.makeid(17);
    let getSameIdToDocument = '';
        getSameIdToDocument = publishId;

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
      if(this.state.tituloEstab !== '' && this.state.descricaoEstab !== '' && this.state.precoEstab !== '' && this.state.phoneEstab !== '' && this.state.enderecoEstab !== '' && this.state.horarioOpen !== '' && this.state.horarioClose !== '' && this.state.categoria !== '' && this.state.image !== null) {
        this.sleep(3000).then(() => { 
          firebase.storage().ref(`${storageUrl}/images/${imageIdStorageState}`).getDownloadURL().then(function(urlImage) {
          firebase.firestore().collection('usuarios').doc(userUID).collection('anuncios').doc(routeIdAnuncio).update({
              titleEstab: e.state.tituloEstab,
              idAnuncio: routeIdAnuncio,
              idUser: userUID,
              descriptionEstab: e.state.descricaoEstab,
              valueServiceEstab: e.state.precoEstab,
              publishData: e.state.date,
              type: 'Estabelecimento',
              verifiedPublish: true,
              phoneNumberEstab: e.state.phoneEstab,
              localEstab: e.state.enderecoEstab,
              categoryEstab: e.state.categoria,
              subcategoryEstab: e.state.subcategoria,
              photoPublish: urlImage,
              workDays: segunda + terca + quarta + quinta + sexta + sabado + domingo,
              timeOpen: e.state.horarioOpen,
              timeClose: e.state.horarioClose
            })

            //editar anuncio para a pasta principal onde todos os anuncios ativos serão visiveis
            firebase.firestore().collection('anuncios').doc(routeIdAnuncio).update({
              titleEstab: e.state.tituloEstab,
              idAnuncio: routeIdAnuncio,
              idUser: userUID,
              descriptionEstab: e.state.descricaoEstab,
              valueServiceEstab: e.state.precoEstab,
              publishData: e.state.date,
              type: 'Estabelecimento',
              verifiedPublish: true,
              phoneNumberEstab: e.state.phoneEstab,
              localEstab: e.state.enderecoEstab,
              categoryEstab: e.state.categoria,
              subcategoryEstab: e.state.subcategoria,
              photoPublish: urlImage,
              workDays: segunda + terca + quarta + quinta + sexta + sabado + domingo,
              timeOpen: e.state.horarioOpen,
              timeClose: e.state.horarioClose
            })
          }).catch(function(error) {
            console.log('ocorreu um erro ao carregar a imagem: ' + error.message)
          })

        })

          this.setModalVisible(true)

        this.sleep(8000).then(() => { 
          this.props.navigation.navigate('TelaPrincipalAnuncio')
        })

      } else {
        alert('Todos os campos devem ser preenchidos!')
      }
    }


    if(type == 'Autonomo') {
      if(this.state.tituloAuto !== '' && this.state.descricaoAuto !== '' && this.state.precoAuto !== '' && this.state.phoneAuto !== '' && this.state.categoria !== '' && this.state.image !== null && this.state.nomeAuto !== '') {
        this.sleep(3000).then(() => { 
          firebase.storage().ref(`${storageUrl}/images/${imageIdStorageState}`).getDownloadURL().then(function(urlImage) {
          firebase.firestore().collection('usuarios').doc(userUID).collection('anuncios').doc(routeIdAnuncio).update({
              titleAuto: e.state.tituloAuto,
              idAnuncio: routeIdAnuncio,
              idUser: userUID,
              nome: e.state.nomeAuto,
              publishData: e.state.date,
              descriptionAuto: e.state.descricaoAuto,
              valueServiceAuto: e.state.precoAuto,
              type: 'Autonomo',
              verifiedPublish: true,
              phoneNumberAuto: e.state.phoneAuto,
              categoryAuto: e.state.categoria,
              subcategoryAuto: e.state.subcategoria,
              photoPublish: urlImage,
            })

            //editar anuncio para a pasta principal onde todos os anuncios ativos serão visiveis
            firebase.firestore().collection('anuncios').doc(routeIdAnuncio).update({
              titleAuto: e.state.tituloAuto,
              idAnuncio: routeIdAnuncio,
              idUser: userUID,
              nome: e.state.nomeAuto,
              publishData: e.state.date,
              descriptionAuto: e.state.descricaoAuto,
              valueServiceAuto: e.state.precoAuto,
              type: 'Autonomo',
              verifiedPublish: true,
              phoneNumberAuto: e.state.phoneAuto,
              categoryAuto: e.state.categoria,
              subcategoryAuto: e.state.subcategoria,
              photoPublish: urlImage,
            })
          }).catch(function(error) {
            console.log('ocorreu um erro ao carregar a imagem: ' + error.message)
          })
        })

            this.setModalVisible(true)

          this.sleep(8000).then(() => { 
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
        <SafeBackgroundPublish>
          <StatusBar
            backgroundColor={this.context.dark ? '#121212' : 'white'}
            barStyle={this.context.dark ? "white-content" : "dark-content"}
          />

          <SafeViewPublish>
            <ViewTopForm>
              
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
                          <Text style={{fontWeight:'bold', marginTop:10, color:'#9A9A9A'}}>Atualizando o seu Anúncio</Text>
                          <PulseIndicator color='#DAA520'/>
                        </View>
                      </View>
                    </Modal>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalLoadVisible}
                        onRequestClose={() => {
                          Alert.alert("Modal has been closed.");
                        }}
                      >
                      <View style={{alignItems:'center', paddingTop: '75%', width: '100%'}}>
                        <View style={{alignItems:'center', backgroundColor:'white', height:'50%', width:'80%', backgroundColor:'white', borderRadius:15, elevation:50, shadowColor:'black', shadowOffset:{width:20, height:40}, shadowOpacity: 0.1}}>
                          <Text style={{fontWeight:'bold', marginTop:10, color:'#9A9A9A'}}>Carregando...</Text>
                          <PulseIndicator color='#DAA520'/>
                        </View>
                      </View>
                    </Modal>
                        
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          { this.state.type == 'Estabelecimento' ?
                            <View style={{flexDirection:'row'}}>
                                <ChooseOption/>
                                <TouchableOpacity>
                                    <Subtitle2Publish
                                      style={{fontWeight: 'bold'}}>Estabelecimento</Subtitle2Publish>
                                </TouchableOpacity>
                            </View>
                          :
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => this.setState({type: 'Estabelecimento'})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30}}/>
                                  <TouchableOpacity onPress={() => this.setState({type: 'Estabelecimento'})}>
                                      <Subtitle2Publish>Estabelecimento</Subtitle2Publish>
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
                              <ChooseOption/>
                                  <TouchableOpacity>
                                      <Subtitle2Publish
                                        style={{fontWeight: 'bold'}}>Autônomo</Subtitle2Publish>
                                  </TouchableOpacity>
                      </View>
                      :
                      <View style={{flexDirection:'row', padding: 16}}>
                              <TouchableOpacity onPress={() => this.setState({type: 'Autonomo'})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30}}/>
                              <TouchableOpacity onPress={() => this.setState({type: 'Autonomo'})}>
                                  <Subtitle2Publish>Autônomo</Subtitle2Publish>
                              </TouchableOpacity>
                      </View>
                     }
                    </View>



                    {/*Divisor estiloso*/}
                    <View style={{ flex: 1,  flexDirection: 'row',  justifyContent: 'space-between',alignItems: 'center'}}>
                      <ViewCircle style={styles.leftCircle} />
                      <View style={styles.dividerLine} />
                      <ViewCircle style={styles.rightCircle} />
                    </View>



                    <ItemContainer>

                      { this.state.type == 'Autonomo' &&
                        <View>
                          <View style={styles.item}>
                              <InputForm
                                value={this.state.tituloAuto}
                                onChangeText={text => this.onChangeTituloAuto(text)}
                                maxLength={20}
                                placeholder="Título Breve do Anúncio                                                        "
                              />
                          </View>

                          <TouchableOpacity onPress={() => this.openModalizeDescricao()} style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <InputForm
                                editable={false}
                                value={this.state.descricaoAuto}
                                onChangeText={text => this.onChangeDescricaoAuto(text)}
                                placeholder="Descrição do Anúncio                                                    "
                              />
                          </TouchableOpacity>

                          <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <InputFormMask
                                type={'money'}
                                value={this.state.precoAuto}
                                onChangeText={text => this.onChangePrecoAuto(text)}
                                keyboardType={"number-pad"}
                                placeholder="Valor do Serviço                                                          "
                              />
                          </View>

                          <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <InputForm
                                value={this.state.nomeAuto}
                                onChangeText={text => this.onChangeNomeAuto(text)}
                                autoCapitalize={'words'}
                                placeholder="Seu nome                                                                       "
                              />
                          </View>

                          <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <InputFormMask
                                type={'cel-phone'}
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
                              <InputForm
                                value={this.state.tituloEstab}
                                onChangeText={text => this.onChangeTituloEstab(text)}
                                maxLength={20}
                                placeholder="Título Breve do Anúncio                                                        "
                              />
                            </View>

                            <TouchableOpacity onPress={() => this.openModalizeDescricaoEstab()} style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <InputForm
                                editable={false}
                                value={this.state.descricaoEstab}
                                onChangeText={text => this.onChangeDescricaoEstab(text)}
                                placeholder="Descrição do Anúncio                                                    "
                              />
                            </TouchableOpacity>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <InputFormMask
                                type={'money'}
                                value={this.state.precoEstab}
                                onChangeText={text => this.onChangePrecoEstab(text)}
                                keyboardType={"number-pad"}
                                placeholder="Valor do Serviço                                                          "
                              />
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                              <InputFormMask
                                type={'cel-phone'}
                                keyboardType={"phone-pad"}
                                maxLength={17}
                                value={this.state.phoneEstab}
                                onChangeText={text => this.onChangePhoneEstab(text)}
                                placeholder="Número de Telefone                                                   "
                              />
                            </View>
                          
                            <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                                <InputForm
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
                                      <TextDays>Seg</TextDays>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                      <ChooseOption onPress={() => this.setState({segunda: false})} style={{marginLeft:15, marginTop:20}}/>
                                      <TextDays>Seg</TextDays>
                                    </View>
                                }

                                { this.state.terca == false ?
                                    <View style={{flexDirection:'row'}}>
                                      <TouchableOpacity onPress={() => this.setState({terca: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                      <TextDays>Ter</TextDays>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                      <ChooseOption onPress={() => this.setState({terca: false})} style={{marginLeft:15, marginTop:20}}/>
                                      <TextDays>Ter</TextDays>
                                    </View>
                                }


                                { this.state.quarta == false ?
                                    <View style={{flexDirection:'row'}}>
                                      <TouchableOpacity onPress={() => this.setState({quarta: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                      <TextDays>Qua</TextDays>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                      <ChooseOption onPress={() => this.setState({quarta: false})} style={{marginLeft:15, marginTop:20}}/>
                                      <TextDays>Qua</TextDays>
                                    </View>
                                }
                              </View>

                              <View style={{flexDirection:'row'}}>
                                { this.state.quinta == false ?
                                  <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => this.setState({quinta: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                    <TextDays>Qui</TextDays>
                                  </View>

                                :
                                  <View style={{flexDirection:'row'}}>
                                    <ChooseOption onPress={() => this.setState({quinta: false})} style={{marginLeft:15, marginTop:20}}/>
                                    <TextDays>Qui</TextDays>
                                  </View>
                                }

                                { this.state.sexta == false ?
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity onPress={() => this.setState({sexta: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                        <TextDays>Sex</TextDays>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                        <ChooseOption onPress={() => this.setState({sexta: false})} style={{marginLeft:15, marginTop:20}}/>
                                        <TextDays>Sex</TextDays>
                                    </View>
                                }


                                { this.state.sabado == false ?
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity onPress={() => this.setState({sabado: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                        <TextDays>Sáb</TextDays>
                                    </View>
                                    :
                                    <View style={{flexDirection:'row'}}>
                                        <ChooseOption onPress={() => this.setState({sabado: false})} style={{marginLeft:15, marginTop:20}}/>
                                        <TextDays>Sáb</TextDays>
                                    </View>
                                }
                              </View>

                            <View style={{flexDirection:'row'}}>
                                { this.state.domingo == false ?
                                  <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => this.setState({domingo: true})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30, marginLeft:15, marginTop:20}}/>
                                    <TextDays>Dom</TextDays>
                                  </View>
                                  :
                                  <View style={{flexDirection:'row'}}>
                                    <ChooseOption onPress={() => this.setState({domingo: false})} style={{marginLeft:15, marginTop:20}}/>
                                    <TextDays>Dom</TextDays>
                                  </View>
                                }
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <View>
                                <TitleChangeColor style={{fontWeight:'bold', paddingLeft: 15, marginTop:20}}>Horário de Abertura</TitleChangeColor>
                                  <View style={{marginLeft:14, width: 130, height:30}}>
                                      <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:4}} onPress={() => this.openModalizeAbertura()}> 
                                        <IconResponsive name="clock" size={24}/>
                                        {this.state.horarioOpen == '' ? 
                                          <Text style={{color:'#9A9A9A', fontWeight:'bold', marginLeft:5}}>Abertura</Text> 
                                        : <Text style={{color:'#9A9A9A', fontWeight:'bold', marginLeft:5}}>{this.state.horarioOpen}</Text> 
                                        }
                                      </TouchableOpacity>
                                  </View>
                              </View>

                                <View>
                                  <TitleChangeColor style={{fontWeight:'bold', paddingLeft: 35, marginTop:20}}>Horário de Fechamento</TitleChangeColor>
                                    <View style={{marginLeft:44, width: 130, height:30}}>
                                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginTop:4}} onPress={() => this.openModalizeFechamento()}> 
                                          <IconResponsive name="stopwatch" size={24}/>
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
                                {this.state.subcategoria == '' ?
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <IconResponsive name="align-left" size={24}/>
                                    <TitleChangeColor style={{ marginLeft:10, fontWeight:'bold'}}>Categoria</TitleChangeColor>
                                </View>
                                :
                                <View style={{flexDirection:'row', alignItems:'center', marginLeft:50}}>
                                    <IconResponsive name="align-left" size={24}/>
                                    <TitleChangeColor style={{ marginLeft:10, fontWeight:'bold'}}>Selecionada ;)</TitleChangeColor>
                                </View>
                                }
                              </TouchableOpacity>
                            </View>
                            
                            {this.state.categoria !== '' ?
                              <PublishTouchable onPress={() => this.uploadFormToFirebase()} style={{marginRight:50}}>
                                <Text style={{color:'#fff', fontWeight:'bold', paddingTop:5, paddingLeft:20}}>
                                  Publicar
                                </Text>
                              </PublishTouchable>
                              :
                              <PublishTouchable onPress={() => this.uploadFormToFirebase()}>
                                <Text style={{color:'#fff', fontWeight:'bold', paddingTop:5, paddingLeft:20}}>
                                  Publicar
                                </Text>
                              </PublishTouchable>
                            }
                        </View>
                    </ItemContainer>

            </ViewTopForm>
          </SafeViewPublish>

          {/*Modalize da categoria*/}
          <Modalize
            ref={this.state.modalizeRef}
            snapPoint={500}
          >
            <View style={{alignItems:'flex-start', marginTop:40}}>
            <Heading6 style={{fontWeight:'bold', marginLeft: 10}}>Selecione a Categoria Desejada</Heading6>
              {categorias.map(l => (
                <View>
                  <TouchableOpacity key={this.makeid(10)} onPress={() => this.getCategory(l.id, l.title)}>
                      <CategoryAndSub>{l.title}</CategoryAndSub>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Modalize>


          {/*Modalize da subcategoria*/}
          <Modalize
            ref={this.state.modalizeRefSub}
            snapPoint={500}
          >
            <View style={{alignItems:'flex-start', marginTop:40}}>
            <Heading6 style={{fontWeight:'bold', marginLeft: 10}}>Selecione a SubCategoria Desejada</Heading6>
              {this.state.subcategorias.map(l => (
                <View>
                  <TouchableOpacity key={this.makeid(10)} onPress={() => this.getSubCategory(l.title)}>
                      <CategoryAndSub>{l.title}</CategoryAndSub>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Modalize>



          {/*Modalize da descrição Autonomo*/}
          <Modalize
            ref={this.state.modalizeRefDescription}
            snapPoint={500}
          >
            <View>
                  <ScrollView>
                      <TextInput
                        multiline={true}
                        underlineColorAndroid="transparent"
                        value={this.state.descricaoAuto}
                        onChangeText={text => this.onChangeDescricaoAuto(text)}
                        style={{padding: 20}}
                        placeholder="Digite uma descrição detalhada para o anúncio"
                      />

                      <View style={{alignItems:'center'}}>
                        <TouchableOpacity
                          onPress={() => this.closeDescriptionModal()}
                          style={{borderRadius:30, alignItems:'center', justifyContent:'center', backgroundColor:'#DAA520', height: 40, width: 40, marginBottom:40}}
                        >
                          <FontAwesome5 name="check-circle" size={24} color={'white'}/>
                        </TouchableOpacity>
                      </View>

                  </ScrollView>
                  
            </View>
          </Modalize>



          {/*Modalize da descrição Estabelecimento*/}
          <Modalize
            ref={this.state.modalizeRefDescriptionEstab}
            snapPoint={500}
          >
            <View>
                  <ScrollView>
                      <TextInput
                        multiline={true}
                        underlineColorAndroid="transparent"
                        value={this.state.descricaoEstab}
                        onChangeText={text => this.onChangeDescricaoEstab(text)}
                        style={{padding: 20}}
                        placeholder="Digite uma descrição detalhada para o anúncio"
                      />

                      <View style={{alignItems:'center'}}>
                        <TouchableOpacity
                          onPress={() => this.closeDescriptionEstabModal()}
                          style={{borderRadius:30, alignItems:'center', justifyContent:'center', backgroundColor:'#DAA520', height: 40, width: 40, marginBottom:40}}
                        >
                          <FontAwesome5 name="check-circle" size={24} color={'white'}/>
                        </TouchableOpacity>
                      </View>

                  </ScrollView>
                  
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
                      <CategoryAndSub>1:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('2:00')}>
                      <CategoryAndSub>2:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('3:00')}>
                      <CategoryAndSub>3:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('4:00')}>
                      <CategoryAndSub>4:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('5:00')}>
                      <CategoryAndSub>5:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('6:00')}>
                      <CategoryAndSub>6:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('7:00')}>
                      <CategoryAndSub>7:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('8:00')}>
                      <CategoryAndSub>8:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('9:00')}>
                      <CategoryAndSub>9:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('10:00')}>
                      <CategoryAndSub>10:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('11:00')}>
                      <CategoryAndSub>11:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('12:00')}>
                      <CategoryAndSub>12:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('13:00')}>
                      <CategoryAndSub>13:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('14:00')}>
                      <CategoryAndSub>14:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('15:00')}>
                      <CategoryAndSub>15:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('16:00')}>
                      <CategoryAndSub>16:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('17:00')}>
                      <CategoryAndSub>17:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('18:00')}>
                      <CategoryAndSub>18:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('19:00')}>
                      <CategoryAndSub>19:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('20:00')}>
                      <CategoryAndSub>20:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('21:00')}>
                      <CategoryAndSub>21:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('22:00')}>
                      <CategoryAndSub>22:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('23:00')}>
                      <CategoryAndSub>23:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioOpen('00:00')}>
                      <CategoryAndSub>00:00</CategoryAndSub>
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
                      <CategoryAndSub>1:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('2:00')}>
                      <CategoryAndSub>2:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('3:00')}>
                      <CategoryAndSub>3:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('4:00')}>
                      <CategoryAndSub>4:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('5:00')}>
                      <CategoryAndSub>5:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('6:00')}>
                      <CategoryAndSub>6:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('7:00')}>
                      <CategoryAndSub>7:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('8:00')}>
                      <CategoryAndSub>8:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('9:00')}>
                      <CategoryAndSub>9:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('10:00')}>
                      <CategoryAndSub>10:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('11:00')}>
                      <CategoryAndSub>11:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('12:00')}>
                      <CategoryAndSub>12:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('13:00')}>
                      <CategoryAndSub>13:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('14:00')}>
                      <CategoryAndSub>14:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('15:00')}>
                      <CategoryAndSub>15:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('16:00')}>
                      <CategoryAndSub>16:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('17:00')}>
                      <CategoryAndSub>17:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('18:00')}>
                      <CategoryAndSub>18:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('19:00')}>
                      <CategoryAndSub>19:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('20:00')}>
                      <CategoryAndSub>20:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('21:00')}>
                      <CategoryAndSub>21:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('22:00')}>
                      <CategoryAndSub>22:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('23:00')}>
                      <CategoryAndSub>23:00</CategoryAndSub>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.getHorarioClose('00:00')}>
                      <CategoryAndSub>00:00</CategoryAndSub>
                  </TouchableOpacity>
                </View>
            </View>
          </Modalize>
        </SafeBackgroundPublish>
      </Fragment>
    );
  }
}
