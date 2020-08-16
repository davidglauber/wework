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
  TouchableOpacity,
  Picker,
  TextInput,
  View,
  Text,
} from 'react-native';

import {Caption, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import { Modalize } from 'react-native-modalize';
import Layout from '../../theme/layout';

//import firebase
import firebase from '../../config/firebase';


import {Heading6} from '../../components/text/CustomText';

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
      modalizeRef: React.createRef(null)
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


  getCategory(param) {
    console.log('Categoria Selecionada: '  + param)
    this.setState({categoria: param})
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



                        <View>
                          <TouchableOpacity style={{alignItems:'center', justifyContent:'center', backgroundColor:'#E3E3E3', width:40, height:40, borderRadius:30}}>
                              <FontAwesome5 name="camera-retro" size={24} color={'#9A9A9A'}/>
                          </TouchableOpacity>
                        </View>
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
                                placeholder="Título do Anúncio                                                        "
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
                                placeholder="Título do Anúncio                                                        "
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
                                  <Picker
                                    selectedValue={this.state.horarioOpen}
                                    onValueChange={(itemValue, itemIndex) => this.setState({horarioOpen: itemValue})}
                                    style={{marginLeft:8, width: 130, height:30}}>
                                    <Picker.Item label="4:00" value=""/>
                                    <Picker.Item label="5:00" value="5:00"/>
                                    <Picker.Item label="6:00" value="6:00"/>
                                    <Picker.Item label="7:00" value="7:00"/>
                                    <Picker.Item label="8:00" value="8:00"/>
                                    <Picker.Item label="9:00" value="9:00"/>
                                    <Picker.Item label="10:00" value="10:00"/>
                                    <Picker.Item label="11:00" value="11:00"/>
                                    <Picker.Item label="12:00" value="12:00"/>
                                    <Picker.Item label="13:00" value="13:00"/>
                                    <Picker.Item label="14:00" value="14:00"/>
                                    <Picker.Item label="15:00" value="15:00"/>
                                    <Picker.Item label="16:00" value="16:00"/>
                                    <Picker.Item label="17:00" value="17:00"/>
                                    <Picker.Item label="18:00" value="18:00"/>
                                    <Picker.Item label="19:00" value="19:00"/>
                                    <Picker.Item label="20:00" value="20:00"/>
                                    <Picker.Item label="21:00" value="21:00"/>
                                    <Picker.Item label="22:00" value="22:00"/>
                                    <Picker.Item label="23:00" value="23:00"/>
                                    <Picker.Item label="00:00" value="00:00"/>
                                  </Picker>
                              </View>

                                <View>
                                  <Text style={{color:Colors.primaryColorDark,  fontWeight:'bold', paddingLeft: 35, marginTop:20}}>Horário de Fechamento</Text>
                                  <Picker
                                    selectedValue={this.state.horarioClose}
                                    onValueChange={(itemValue, itemIndex) => this.setState({horarioClose: itemValue})}
                                    style={{marginLeft:28, width: 130, height:30}}>
                                    <Picker.Item label="3:00" value=""/>
                                    <Picker.Item label="5:00" value="5:00"/>
                                    <Picker.Item label="6:00" value="6:00"/>
                                    <Picker.Item label="7:00" value="7:00"/>
                                    <Picker.Item label="8:00" value="8:00"/>
                                    <Picker.Item label="9:00" value="9:00"/>
                                    <Picker.Item label="10:00" value="10:00"/>
                                    <Picker.Item label="11:00" value="11:00"/>
                                    <Picker.Item label="12:00" value="12:00"/>
                                    <Picker.Item label="13:00" value="13:00"/>
                                    <Picker.Item label="14:00" value="14:00"/>
                                    <Picker.Item label="15:00" value="15:00"/>
                                    <Picker.Item label="16:00" value="16:00"/>
                                    <Picker.Item label="17:00" value="17:00"/>
                                    <Picker.Item label="18:00" value="18:00"/>
                                    <Picker.Item label="19:00" value="19:00"/>
                                    <Picker.Item label="20:00" value="20:00"/>
                                    <Picker.Item label="21:00" value="21:00"/>
                                    <Picker.Item label="22:00" value="22:00"/>
                                    <Picker.Item label="23:00" value="23:00"/>
                                    <Picker.Item label="00:00" value="00:00"/>
                                  </Picker>
                                </View>
                            </View>
                              
                            </View>


                          </View>

                        }



                        <View style={{flexDirection:'row', paddingTop:50, paddingBottom:10, alignItems:'center', justifyContent:'center'}}>                          
                            <View style={{marginRight:120}}>
                              <TouchableOpacity onPress={() => this.openModalize()} style={{justifyContent:'center', alignItems:'center', flexDirection:'row', marginLeft:8, marginRight:5, borderRadius:10}}>
                                <FontAwesome5 name="align-left" size={24} color={'#70AD66'}/>
                                <Text style={{ marginLeft:10, fontWeight:'bold', color:'#70AD66'}}>Categoria</Text>
                              </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={{backgroundColor:'#70AD66', width:100, height:30, borderRadius:30}}>
                              <Text style={{color:'#fff', fontWeight:'bold', paddingTop:5, paddingLeft:20}}>
                                Publicar
                              </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

            </View>
          </View>
          <Modalize
            ref={this.state.modalizeRef}
            snapPoint={200}
          >
            <View style={{alignItems:'flex-start', marginTop:40}}>
            <Heading6 style={{fontWeight:'bold', marginLeft: 10}}>Selecione a Categoria Desejada</Heading6>
              {categorias.map(l => (
                <View>
                  <TouchableOpacity key={l.id} onPress={() => this.getCategory(l.title)}>
                      <Text style={{fontWeight:'700', color:'#70AD66', fontSize:14, marginLeft:17, marginTop:10, marginBottom:15}}>{l.title}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Modalize>
        </SafeAreaView>
      </Fragment>
    );
  }
}
