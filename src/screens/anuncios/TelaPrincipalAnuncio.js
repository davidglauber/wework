
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

// HomeA Config
const imgHolder = require('../../assets/img/imgholder.png');

import firebase from '../../config/firebase'; 


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

export default class TelaPrincipalAnuncio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anunciosEstab: [],
      anunciosAuto:[],
    };
  }






  async componentDidMount() {
    let e = this;
    let currentUserUID = firebase.auth().currentUser.uid;

    await firebase.firestore().collection(`usuarios/${currentUserUID}/anuncios`).where("type", "==", "Autonomo") .get().then(function(querySnapshot){
      let anunciosAutoDidMount = []
      querySnapshot.forEach(function(doc) {
        anunciosAutoDidMount.push({
          idUser: doc.data().idUser,
          photo: doc.data().photoPublish,
          title: doc.data().titleAuto,
          description: doc.data().descriptionAuto,
          type: doc.data().type
        })
      })
      e.setState({anunciosAuto: anunciosAutoDidMount})
    })

    await firebase.firestore().collection(`usuarios/${currentUserUID}/anuncios`).where("type", "==", "Estabelecimento") .get().then(function(querySnapshot){
      let anunciosEstabDidMount = []
      querySnapshot.forEach(function(doc) {
        anunciosEstabDidMount.push({
          idUser: doc.data().idUser,
          photo: doc.data().photoPublish,
          title: doc.data().titleEstab,
          description: doc.data().descriptionEstab,
          type: doc.data().type
        })
      })
      e.setState({anunciosEstab: anunciosEstabDidMount})
    })

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





  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };


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

 
  render() {
    const {anunciosEstab, anunciosAuto} = this.state;

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
                <TouchableOpacity  style={{borderRadius:5, alignItems:'center', justifyContent:'center', width:116, height:27, backgroundColor: "#e3e3e3"}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Ativos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.navigateTo('Orders')} style={{marginRight:5, borderRadius:25, alignItems:'center', justifyContent:'center', width:40, height:40, backgroundColor: "#70AD66"}}>
                        <FontAwesome5  name="plus" size={19} color={"#fff"} />
                </TouchableOpacity>

                <TouchableOpacity style={{marginRight:5, borderRadius:5, alignItems:'center', justifyContent:'center', width:116, height:27, backgroundColor: "#e3e3e3"}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>Pendentes</Text>
                </TouchableOpacity>
              </View>


            </View>



                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                      <FlatList
                        keyExtractor={() => this.makeid(17)}
                        data={anunciosAuto}
                        renderItem={({item}) => 
                            <View style={{width: 336, height: 170, marginBottom:5, marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                              <View style={{flexDirection:'row'}}>
                                  <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                  
                                  <View style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:25, color:'#70AD66'}}>{item.title}</Text>
                                    
                                    <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                      <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>{item.description}</Text>
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
                        }
                      />
                    </View>
                </View>

                <View style={{flex:1, alignItems: 'center'}}>
                    <View>
                      <FlatList
                        keyExtractor={() => this.makeid(17)}
                        data={anunciosEstab}
                        renderItem={({item}) => 
                            <View style={{width: 336, height: 170, marginBottom:5,marginTop: 10, borderRadius: 10, backgroundColor: '#FFFDFD', elevation:5, shadowColor:'black', shadowOffset:{width:2, height:4}, shadowOpacity: 0.2}}>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={{uri: item.photo}} style={{width:125, height:88, borderRadius: 10, marginLeft: 20, marginTop: 20}}></Image>
                                    
                                    <View style={{flexDirection:'column'}}>
                                        <Text style={{fontSize:17, marginTop:20, fontWeight: 'bold', marginLeft:10, color:'#70AD66'}}>{item.title}</Text>
                                      
                                      <View style={{justifyContent: 'center', alignItems: 'center',}}>
                                        <Text style={{textAlign:'center', fontSize:12, marginTop:20, marginRight:170, fontWeight: '500', marginLeft:25, color:'#888888'}}>{item.description}</Text>
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
                        }
                      />
                    </View>
                  </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
