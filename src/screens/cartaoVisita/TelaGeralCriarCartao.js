
// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Color from 'color';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import ActionProductCard from '../../components/cards/ActionProductCard';
//import ActionProductCardHorizontal from '../../components/cards/ActionProductCardHorizontal';
import LinkButton from '../../components/buttons/LinkButton';
import {Heading6} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

//import gradient
import  { LinearGradient } from 'expo-linear-gradient';

// HomeA Config
const imgHolder = require('../../assets/img/imgholder.png');


//Import images
const fotoAnuncio = require('../../assets/img/confeiteira.jpeg');
const fotoAnuncioEst = require('../../assets/img/traducao.jpg')


//import icons
import { FontAwesome5 } from '@expo/vector-icons';

// HomeA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  titleText: {
    fontWeight: '700',
  },
  viewAllText: {
    color: Colors.primaryColor,
  },
  categoriesList: {
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 8,
  },
  cardImg: {borderRadius: 4},
  card: {
    marginLeft: 8,
    width: 104,
    height: 72,
    resizeMode: 'cover',
  },
  cardOverlay: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Color(Colors.overlayColor).alpha(0.2),
    overflow: 'hidden',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardTitle: {
    padding: 12,
    fontWeight: '500',
    fontSize: 16,
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  productsList: {
    paddingBottom: 16,
    // spacing = paddingHorizontal + ActionProductCard margin = 12 + 4 = 16
    paddingHorizontal: 12,
  },
  popularProductsList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
});

export default class TelaGeralCriarCartao extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [
        {
          key: 1,
          imageUri: require('../../assets/img/pizza_3.jpg'),
          name: 'Pizza',
        },
        {
          key: 2,
          imageUri: require('../../assets/img/meat_1.jpg'),
          name: 'Grill',
        },
        {
          key: 3,
          imageUri: require('../../assets/img/spaghetti_2.jpg'),
          name: 'Pasta',
        },
        {
          key: 4,
          imageUri: require('../../assets/img/soup_1.jpg'),
          name: 'Soups',
        },
        {
          key: 5,
          imageUri: require('../../assets/img/salad_1.jpg'),
          name: 'Salads',
        },
      ],
      products: [
        {
          imageUri: require('../../assets/img/pizza_4.png'),
          name: 'Pizza Carbonara 35cm',
          price: 10.99,
          label: 'new',
        },
        {
          imageUri: require('../../assets/img/sandwich_1.png'),
          name: 'Breakfast toast sandwich',
          price: 4.99,
        },
        {
          imageUri: require('../../assets/img/cake_3.png'),
          name: 'Cake Cherries Pie',
          price: 8.49,
          discountPercentage: 10,
        },
        {
          imageUri: require('../../assets/img/soup_2.png'),
          name: 'Broccoli Soup',
          price: 6.49,
          discountPercentage: 10,
        },
      ],
      popularProducts: [
        {
          imageUri: require('../../assets/img/sandwich_2.jpg'),
          name: 'Subway sandwich',
          price: 8.49,
          quantity: 0,
          discountPercentage: 10,
        },
        {
          imageUri: require('../../assets/img/pizza_1.jpg'),
          name: 'Pizza Margarita 35cm',
          price: 10.99,
          quantity: 0,
        },
        {
          imageUri: require('../../assets/img/cake_1.jpg'),
          name: 'Chocolate cake',
          price: 4.99,
          quantity: 0,
        },
      ],
    };
  }

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  onPressRemove = item => () => {
    let {quantity} = item;
    quantity -= 1;

    const {popularProducts} = this.state;
    const index = popularProducts.indexOf(item);

    if (quantity < 0) {
      return;
    }
    popularProducts[index].quantity = quantity;

    this.setState({
      popularProducts: [...popularProducts],
    });
  };

  onPressAdd = item => () => {
    const {quantity} = item;
    const {popularProducts} = this.state;

    const index = popularProducts.indexOf(item);
    popularProducts[index].quantity = quantity + 1;

    this.setState({
      popularProducts: [...popularProducts],
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderCategoryItem = ({item, index}) => (
    <ImageBackground
      key={index}
      defaultSource={imgHolder}
      source={getImgSource(item.imageUri)}
      imageStyle={styles.cardImg}
      style={styles.card}>
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={this.navigateTo('Category')}
          style={styles.cardContainer}
          // borderless
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableItem>
      </View>
    </ImageBackground>
  );

  renderProductItem = ({item, index}) => (
    <ActionProductCard
      onPress={this.navigateTo('Product')}
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.price}
      discountPercentage={item.discountPercentage}
      label={item.label}
    />
  );

 
  render() {
    const {categories, products, popularProducts} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
          <LinearGradient
          // Background Linear Gradient
          colors={['#00b970', '#00b9a7', '#00b9a7']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        />
        <StatusBar
          backgroundColor={"#00b970"}
          barStyle="white-content"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
                <TouchableOpacity  style={{borderRadius:5, alignItems:'center', justifyContent:'center', width:116, height:27, backgroundColor: "#e3e3e3"}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Ativos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.navigateTo('Orders')} style={{marginRight:5, borderRadius:25, alignItems:'center', justifyContent:'center', width:40, height:40}}>
                        <FontAwesome5  name="plus" size={19} color={"#fff"} />
                </TouchableOpacity>

                <TouchableOpacity style={{marginRight:5, borderRadius:5, alignItems:'center', justifyContent:'center', width:116, height:27, backgroundColor: "#e3e3e3"}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Pendentes</Text>
                </TouchableOpacity>
              </View>

              {/*<FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                alwaysBounceHorizontal={false}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderCategoryItem}
                contentContainerStyle={styles.categoriesList}
              />
              */}

            </View>


           {/*  <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={false}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderProductItem}
              contentContainerStyle={styles.productsList}
            />

           */}


                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                        <View style={{width: 336, height: 170, marginBottom:5, marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                            <View style={{flexDirection:'row'}}>
                                <Image source={fotoAnuncio} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:25, color:'#70AD66'}}>Forneço Cupcakes</Text>
                                  
                                  <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                    <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>Sou confeiteiro Profissional, tenho variedades de sabores</Text>
                                  </View>
                                </View>
                            </View>  

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={this.navigateTo('TelaAnuncio')} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                    <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                </TouchableOpacity>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="trash" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 30}}>
                                    <FontAwesome5  name="user-tie" size={19} color={"#70AD66"} />
                                </View>
                            </View> 

                        </View>
                    </View>
                </View>



                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                        <View style={{width: 336, height: 170, marginBottom:5,marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                            <View style={{flexDirection:'row'}}>
                                <Image source={fotoAnuncioEst} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:10, color:'#70AD66'}}>Tradução Profissional</Text>
                                  
                                  <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                    <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>Transcrevo qualquer documento em qualquer língua</Text>
                                  </View>
                                </View>
                            </View>  

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={this.navigateTo('TelaAnuncio')} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                    <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                </TouchableOpacity>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="trash" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 30}}>
                                    <FontAwesome5  name="briefcase" size={19} color={"#70AD66"} />
                                </View>
                            </View> 

                        </View>
                    </View>
                </View>



                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                        <View style={{width: 336, height: 170, marginBottom:5,marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                            <View style={{flexDirection:'row'}}>
                                <Image source={fotoAnuncioEst} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:10, color:'#70AD66'}}>Tradução Profissional</Text>
                                  
                                  <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                    <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>Transcrevo qualquer documento em qualquer língua</Text>
                                  </View>
                                </View>
                            </View>  

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={this.navigateTo('TelaAnuncio')} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                    <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                </TouchableOpacity>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="trash" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 30}}>
                                    <FontAwesome5  name="briefcase" size={19} color={"#70AD66"} />
                                </View>
                            </View> 

                        </View>
                    </View>
                </View>


                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                        <View style={{width: 336, height: 170, marginBottom:5,marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                            <View style={{flexDirection:'row'}}>
                                <Image source={fotoAnuncioEst} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:10, color:'#70AD66'}}>Tradução Profissional</Text>
                                  
                                  <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                    <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>Transcrevo qualquer documento em qualquer língua</Text>
                                  </View>
                                </View>
                            </View>  

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={this.navigateTo('TelaAnuncio')} style={{paddingLeft: 10, backgroundColor: "#70AD66", width:100, height:20, borderRadius: 5, marginTop: 24, marginLeft: 31}}>
                                    <Text style={{color: 'white'}}>Ver Detalhes</Text>
                                </TouchableOpacity>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="pencil-alt" size={19} color={"grey"} />
                                </View>

                                <View style={{marginTop: 24, marginRight: 10}}>
                                    <FontAwesome5  name="trash" size={19} color={"grey"} />
                                </View>
                                
                                <View style={{marginTop: 24, marginRight: 30}}>
                                    <FontAwesome5  name="briefcase" size={19} color={"#70AD66"} />
                                </View>
                            </View> 

                        </View>
                    </View>
                </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
