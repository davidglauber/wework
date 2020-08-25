/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  I18nManager,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import components
import Button from '../../components/buttons/Button';
import {Subtitle1} from '../../components/text/CustomText';


//import firebase
import firebase from '../../config/firebase';


import {Heading6} from '../../components/text/CustomText';

// import colors
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// SearchFilterB Config
const isRTL = I18nManager.isRTL;

// SearchFilterB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    flex: 1,
    ...Platform.select({
      android: {
        minHeight: Layout.SCREEN_HEIGHT - (56 + 80),
      },
    }),
  },
  formContainer: {
    flex: 1,
  },
  mt8: {
    marginTop: 8,
  },
  subtitle: {
    padding: 16,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 8,
  },
  inputContainer: {
    marginHorizontal: 8,
  },
  small: {
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.16)',
    paddingHorizontal: 8,
    height: 46,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: isRTL ? 'right' : 'left',
  },
  textInputFocused: {
    borderColor: Colors.primaryColor,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});

// SearchFilterB
export default class FilterB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromPrice: '',
      toPrice: '',
      fromPriceFocused: false,
      toPriceFocused: false,
      menu: [
        {title: 'Autônomo', picked: false},
        {title: 'Estabelecimento', picked: true}
      ],
      categorias: [],
      selected:[],
      type:'Estabelecimento'
    };
  }

 async componentDidMount() {
    let e = this;
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );

    //getting categories
    await firebase.firestore().collection('categorias').get().then(function(querySnapshot) {
      let categoriaDidMount = []
      querySnapshot.forEach(function(doc) {
        categoriaDidMount.push({
          id: doc.data().id,
          title: doc.data().title,
          picked: false
        })
      })
      e.setState({categorias: categoriaDidMount})
    })

  };

  // avoid memory leak
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
    this.keyboardDidHideListener.remove();
  };

  keyboardDidHide = () => {
    this.setState({
      fromPriceFocused: false,
      toPriceFocused: false,
    });
  };

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };


  renderAndSelectCategory(itemTitle, itemPicked) {
    let selected = this.state.selected;
    let array = [];

    itemPicked = true
    array.push({title: itemTitle, picked: itemPicked});

    if(selected.length <= 0) {
      this.setState({selected: array})
    } else {
      this.setState({selected: selected.concat(array)})
    }
    console.log('id selecionado: ' + selected)
  }


  render() {
    const {
      menu,
      categorias,
      selected
    } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={"white"}
          barStyle="dark-content"
        />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Heading6 style={{fontWeight: '700'}}>Filtro de Anúncio</Heading6>
            </View>
            <Subtitle1 style={styles.subtitle}>Qual tipo de Profissional?</Subtitle1>
            <View style={styles.rowWrap}>
                <View>
                  { this.state.type == 'Estabelecimento' &&
                    <View style={{flexDirection:'row'}}>
                      <TouchableOpacity onPress={() => this.setState({type: 'Autônomo'})} style={{backgroundColor:'green', borderRadius:30, backgroundColor:'rgba(35, 47, 52, 0.08)', margin: 7}}>
                        <Text style={{padding:10, color:'black'}}>Autônomo</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{borderRadius:30, backgroundColor:'rgba(0, 185, 112, 0.24)', margin: 7}}>
                        <Text style={{padding:10, color:'#00b970'}}>Estabelecimento</Text>
                      </TouchableOpacity>
                    </View>
                  }

                  { this.state.type == 'Autônomo' &&
                    <View style={{flexDirection:'row'}}>
                      <TouchableOpacity  style={{borderRadius:30, backgroundColor:'rgba(0, 185, 112, 0.24)', margin: 7}}>
                        <Text style={{padding:10, color:'#00b970'}}>Autônomo</Text> 
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.setState({type: 'Estabelecimento'})} style={{backgroundColor:'green', borderRadius:30, backgroundColor:'rgba(35, 47, 52, 0.08)', margin: 7}}>
                        <Text style={{padding:10, color:'black'}}>Estabelecimento</Text>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
            </View>

            <Subtitle1 style={[styles.subtitle, styles.mt8]}>Escolha a categoria abaixo</Subtitle1>
            <View style={{flexDirection: 'row', flexWrap: 'wrap',   justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 16}}>
              {categorias.map((item) => (
                <View>
                    <TouchableOpacity onPress={() => this.renderAndSelectCategory(item.title, item.picked)} style={{borderRadius:30, backgroundColor:'rgba(35, 47, 52, 0.08)', margin: 7}}>
                      <Text style={{padding:10}}>{item.title}</Text>
                    </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>


          <View style={styles.buttonContainer}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {selected.map((item) => (
                  <View>
                      <TouchableOpacity style={{borderRadius:30, backgroundColor:'rgba(0, 185, 112, 0.24)', margin: 7}}>
                        <Text style={{padding:10, color:'#00b970'}}>{item.title}</Text>
                      </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>

            {selected.length == 1 ?
              <Text style={{marginBottom:17, color:'#00b970', fontWeight: "bold"}}>{selected.length} categoria selecionada</Text>
              :
              <Text style={{marginBottom:17, color:'#00b970', fontWeight: "bold"}}>{selected.length} categorias selecionadas</Text>
            }
            <Button onPress={this.goBack} title="Aplicar Filtros" rounded />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
