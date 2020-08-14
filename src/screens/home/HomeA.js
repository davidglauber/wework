
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


//import AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';


//import firebase 
import firebase from '../../config/firebase';

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

export default class HomeA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verified:false,
      status: null,
      emailUserFunction:''
    };
  }



  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };






async componentDidMount() {
   let e = this;
    await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          e.setState({status: true})
          let removeCharacters = user.email.replace('@', '')
          let removeCharacters2 = removeCharacters.replace('gmail.com', '')
          let removeCharacters3 = removeCharacters2.replace('hotmail.com', '')
          let removeCharacters4 = removeCharacters3.replace('outlook.com', '')
          let removeCharacters5 = removeCharacters4.replace('live.com', '')
          let removeCharacters6 = removeCharacters5.replace('yahoo.com', '')

          e.setState({emailUserFunction: removeCharacters6})
        } else {
          e.setState({status: false})
        }

    })




   let nomeUser = '';
   let emailUser = '';
   let senhaUser = '';
   let telefoneUser = '';
   let dataNascimentoUser = '';


    AsyncStorage.getItem('verified').then((value) => {
      if(value == 'true') {
        AsyncStorage.setItem('verified', JSON.stringify(true))
      }

      if(value == 'false') {
         AsyncStorage.getItem('nome').then((value) =>{nomeUser = value})
         AsyncStorage.getItem('email').then((value) =>{emailUser = value})
         AsyncStorage.getItem('senha').then((value) =>{senhaUser = value})
         AsyncStorage.getItem('telefone').then((value) =>{telefoneUser = value})
         AsyncStorage.getItem('dataNascimento').then((value) =>{dataNascimentoUser = value})

        this.props.navigation.navigate('EmailVerificacao', {
            nome: nomeUser,
            email: emailUser,
            senha: senhaUser,
            telefone: telefoneUser,
            dataNascimento: dataNascimentoUser
        })
        alert('Você ainda não confirmou o email!')
      }

      if(value == 'undefined' || value == 'null') {
        return null;
      }
      console.log('VALOR DO ASYNC STORAGE: ' + value)
    })



  }




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
    const { status, emailUserFunction } = this.state

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
              
                {status == true ? 
                    <TouchableOpacity onPress={this.navigateTo('Settings')} style={{borderRadius:5, justifyContent:'center', width:216, height:27}}>
                        <Text style={{color: '#70AD66', fontWeight: 'bold'}}>Olá, {emailUserFunction}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.navigateTo('SignUp')} style={{borderRadius:5, alignItems:'center', justifyContent:'center', width:116, height:27, backgroundColor: "#70AD66"}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Criar Conta</Text>
                    </TouchableOpacity>
                }
                    
                <TouchableOpacity onPress={this.navigateTo('FilterB')} style={{width:20, height:20}}>
                    <FontAwesome5  name="sort-alpha-up" size={19} color={"#70AD66"} />
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

            <View style={styles.titleContainer}>
              <Heading6 style={styles.titleText}>Anúncios</Heading6>
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
