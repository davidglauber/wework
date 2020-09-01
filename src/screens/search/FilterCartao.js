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
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import components
import Button from '../../components/buttons/Button';
import {Subtitle1} from '../../components/text/CustomText';


//import firebase
import firebase from '../../config/firebase';


import {Heading6} from '../../components/text/CustomText';


import { FilterUnderContainer, HeadingInverse, Sub1Filter, TextFilter, TouchableFilter, TouchableFilterUnselected, TouchableResponsive, SafeBackground, ButtonIconContainer, CallAndMessageContainer, IconResponsive, TextDescription, TextTheme, TextDescription2 } from '../home/styles';

import { ThemeContext } from '../../../App';


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
export default class FilterCartao extends Component {
  static contextType = ThemeContext

  constructor(props) {
    super(props);
    this.state = {
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
        categoriaDidMount.push(doc.data().title)
      })
      e.setState({categorias: categoriaDidMount})
    })

  };

  // avoid memory leak
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
    this.keyboardDidHideListener.remove();
  };
  

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };


  renderAndSelectCategory(itemTitle) {
    let selected = this.state.selected;
    let categorias = this.state.categorias;
    let array = [];

    var index = categorias.indexOf(itemTitle)


    categorias.splice(index, 1)
    array.push(itemTitle);

    if(selected.length <= 0) {
      this.setState({selected: array})
    } 

    else if(selected.length >= 10) {
      alert('Você só pode escolher até 10 categorias diferentes!')
    } else {
      this.setState({selected: selected.concat(array)})
    }
    console.log('LISTA DE SELECIONADOS: ' + selected)
  }


  reuploadCategoriesToList(itemTitle) {
    let selected = this.state.selected;
    let categorias = this.state.categorias;
    let array = [];

    var index = selected.indexOf(itemTitle)


    selected.splice(index, 1)
    array.push(itemTitle);
    
    if(categorias.length <= 0) {
      this.setState({categorias: array})
    } else {
      this.setState({categorias: categorias.concat(array)})
    }

  }


  render() {
    const {
      categorias,
      selected
    } = this.state;

    return (
      <SafeBackground>
        <StatusBar
          backgroundColor={this.context.dark ? '#121212' : 'white'}
          barStyle={this.context.dark ? "white-content" : "dark-content"}
        />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <HeadingInverse>Filtro de Cartão</HeadingInverse>
            </View>
            <Sub1Filter>Qual tipo de Profissional?</Sub1Filter>
            <View style={styles.rowWrap}>
                <View>
                  { this.state.type == 'Estabelecimento' &&
                    <View style={{flexDirection:'row'}}>
                      <TouchableFilterUnselected onPress={() => this.setState({type: 'Autonomo'})}>
                        <TextFilter style={{color:'black'}}>Autônomo</TextFilter>
                      </TouchableFilterUnselected>

                      <TouchableFilter>
                        <TextFilter>Estabelecimento</TextFilter>
                      </TouchableFilter>
                    </View>
                  }

                  { this.state.type == 'Autonomo' &&
                    <View style={{flexDirection:'row'}}>
                      <TouchableFilter>
                        <TextFilter>Autônomo</TextFilter> 
                      </TouchableFilter>

                      <TouchableFilterUnselected onPress={() => this.setState({type: 'Estabelecimento'})}>
                        <TextFilter style={{color:'black'}}>Estabelecimento</TextFilter>
                      </TouchableFilterUnselected>
                    </View>
                  }
                </View>
            </View>

            <Sub1Filter style={styles.mt8}>Escolha a categoria abaixo</Sub1Filter>
            <View showsVerticalScrollIndicator={false} style={{flexDirection: 'row', flexWrap: 'wrap',   justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 16}}>
              {categorias.map((item) => (
                <View>
                    <TouchableFilterUnselected onPress={() => this.renderAndSelectCategory(item)}>
                      <TextFilter>{item}</TextFilter>
                    </TouchableFilterUnselected>
                </View>
              ))}
            </View>
          </View>


          <FilterUnderContainer>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {selected.map((item) => (
                  <View>
                      <TouchableFilter key={item.id} onPress={() => this.reuploadCategoriesToList(item)}>
                        <TextFilter>{item}</TextFilter>
                      </TouchableFilter>
                  </View>
                ))}
            </ScrollView>

            {selected.length == 1 ?
              <Text style={{marginBottom:17, color:'#DAA520', fontWeight: "bold"}}>{selected.length} categoria selecionada</Text>
              :
              <Text style={{marginBottom:17, color:'#DAA520', fontWeight: "bold"}}>{selected.length} categorias selecionadas</Text>
            }
            <Button onPress={() => this.props.navigation.navigate('CartaoFiltro', {
              categoriasFiltradas: this.state.selected,
              type: this.state.type
            })} title="Aplicar Filtros" rounded />
          </FilterUnderContainer>
        </KeyboardAwareScrollView>
      </SafeBackground>
    );
  }
}
