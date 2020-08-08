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
  View,
  Text,
} from 'react-native';

import {Caption, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import Layout from '../../theme/layout';

// import components
import OrderItem from '../../components/cards/OrderItemB';
import { FontAwesome5 } from '@expo/vector-icons';

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
  }
});

// OrdersB
export default class OrdersB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Estabelecimento',
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

  renderItem = ({item, index}) => (
    <View style={{ marginVertical: 4,
      marginHorizontal: 12,
      borderRadius: 16,
      backgroundColor: Colors.background}}>
    
      <View style={{ width: Layout.SCREEN_WIDTH - 2 * 12}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',padding: 16}}>
          <View style={{flexDirection:'column'}}>
            <Subtitle2
              style={{ paddingBottom: 2, fontWeight: 'bold', color: Colors.primaryColorDark, textAlign: 'left'}}>{'Order #2121'}</Subtitle2>
            <Caption>12/12/2005</Caption>
            <FontAwesome5 nome="sort-alpha-up" size={40} color={'#70AD66'}/>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Subtitle1>{`$ 43,21`}</Subtitle1>
            <Caption>{'33 items'}</Caption>
          </View>
        </View>
      </View>

      {/*Divisor estiloso*/}
      <View style={{ flex: 1,  flexDirection: 'row',  justifyContent: 'space-between',alignItems: 'center'}}>
        <View style={[styles.circleMask, styles.leftCircle]} />
        <View style={styles.dividerLine} />
        <View style={[styles.circleMask, styles.rightCircle]} />
      </View>

      <View style={styles.itemContainer}>
            <TouchableOpacity>
              <View style={styles.item}>
                <Subtitle2>TESTE</Subtitle2>
                <Subtitle2>{'R$3'}</Subtitle2>
              </View>
            </TouchableOpacity>
      </View>


    </View>
  );

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
                                <Subtitle2
                                  style={{marginLeft: 5, paddingBottom: 2, fontWeight: 'bold', color: Colors.primaryColorDark, textAlign: 'left'}}>Estabelecimento</Subtitle2>
                            </View>
                          :
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => this.setState({type: 'Estabelecimento'})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30}}/>
                                <Subtitle2
                                  style={{marginLeft: 5, paddingBottom: 2, fontWeight: 'bold', color: Colors.primaryColorDark, textAlign: 'left'}}>Estabelecimento</Subtitle2>
                            </View>                         
                          }
                        </View>



                        <View style={{alignItems: 'flex-end'}}>
                          <Subtitle1>{`$ 43,21`}</Subtitle1>
                          <Caption>{'33 items'}</Caption>
                        </View>
              </View>

                     {this.state.type == 'Autonomo' ?     
                      <View style={{flexDirection:'row', padding: 16}}>
                              <TouchableOpacity  style={{backgroundColor:'#70AD66', width:18, height:18, borderRadius:30}}/>
                              <Subtitle2
                            style={{marginLeft: 5, paddingBottom: 2, fontWeight: 'bold', color: Colors.primaryColorDark, textAlign: 'left'}}>Autônomo</Subtitle2>
                      </View>
                      :
                      <View style={{flexDirection:'row', padding: 16}}>
                              <TouchableOpacity onPress={() => this.setState({type: 'Autonomo'})} style={{backgroundColor:'#E3E3E3', width:18, height:18, borderRadius:30}}/>
                              <Subtitle2
                                  style={{marginLeft: 5, paddingBottom: 2, fontWeight: 'bold', color: Colors.primaryColorDark, textAlign: 'left'}}>Autônomo</Subtitle2>
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
                          <TouchableOpacity>
                            <View style={styles.item}>
                              <Subtitle2>TESTE</Subtitle2>
                              <Subtitle2>{'R$3'}</Subtitle2>
                            </View>
                          </TouchableOpacity>
                    </View>

            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}
