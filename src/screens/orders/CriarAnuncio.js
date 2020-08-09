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
import Layout from '../../theme/layout';


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
      categoria: '',
      horarioOpen:'',
      horarioClose:'',
      phone:'',
      segunda:false,
      terca:false, 
      quarta:false,
      quinta:false,
      sexta:false,
      sabado:false,
      domingo:false,
      orders: [
        {
          orderNumber: '11',
          orderDate: '22 July, 2019',
          orderStatus: 'on-the-way',
          orderItems: [
            {
              name: 'Pizza',
              price: 4.99,
            },
            {
              name: 'Grill',
              price: 8.99,
            },
            {
              name: 'Pasta',
              price: 5.99,
            },
          ],
        },
        {
          orderNumber: '10',
          orderDate: '10 July, 2019',
          orderStatus: 'pending',
          orderItems: [
            {
              name: 'Pizza One',
              price: 7.99,
            },
            {
              name: 'Pizza Mozzarella',
              price: 8.99,
            },
            {
              name: 'Pizza Gorgonzola',
              price: 6.99,
            },
            {
              name: 'Pizza Funghi',
              price: 9.99,
            },
          ],
        },
        {
          orderNumber: '09',
          orderDate: '05 July, 2019',
          orderStatus: 'delivered',
          orderItems: [
            {
              name: 'Pizza Mozzarella',
              price: 8.99,
            },
            {
              name: 'Pizza Gorgonzola',
              price: 6.99,
            },
            {
              name: 'Pizza Funghi',
              price: 9.99,
            },
          ],
        },
      ],
    };
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

  onChangePhone(text) {
    this.setState({phone: text})
    console.log('mask phone: '  + this.state.phone)
  }

  render() {
    const {orders} = this.state;

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
                        <View style={styles.item}>
                            <TextInput
                              style={styles.inputStyle}
                              maxLength={21}
                              placeholder="Título do Anúncio                                                        "
                            />
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                            <TextInput
                              style={styles.inputStyle}
                              placeholder="Descrição do Anúncio                                                    "
                            />
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                            <TextInput
                              style={styles.inputStyle}
                              keyboardType={"number-pad"}
                              placeholder="Valor do Serviço                                                          "
                            />
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                            <TextInput
                              style={styles.inputStyle}
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
                              value={this.state.phone}
                              onChangeText={text => this.onChangePhone(text)}
                              placeholder="Número de Telefone                                                   "
                            />
                        </View>

                        {this.state.type == 'Estabelecimento' &&
                          <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center',paddingHorizontal: 16, height: 36}}>
                                <TextInput
                                  style={styles.inputStyle}
                                  keyboardType={"phone-pad"}
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

                        <View style={{flexDirection:'row', paddingTop:50, alignItems:'center', justifyContent:'center'}}>
                          <View style={{backgroundColor:'#70AD66', marginRight:5, borderRadius:10}}>
                            <Picker
                              selectedValue={this.state.categoria}
                              onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})}
                              style={{marginLeft:10, width: 180, height:50}}>
                              <Picker.Item label="Categoria" value=""/>
                              <Picker.Item label="Mecânico(a)" value="Mecânico(a)"/>
                              <Picker.Item label="Artesão" value="Artesão"/>
                              <Picker.Item label="Doméstico" value="Doméstico"/>
                              <Picker.Item label="Corredor" value="Corredor"/>
                              <Picker.Item label="Criador de Aves" value="Criador de Aves"/>
                              <Picker.Item label="Farmaceutico" value="Farmaceutico"/>
                            </Picker>
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
        </SafeAreaView>
      </Fragment>
    );
  }
}
