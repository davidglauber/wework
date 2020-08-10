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
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import components
import Button from '../../components/buttons/Button';
import FilterPicker from '../../components/pickers/FilterPicker';
import {Subtitle1} from '../../components/text/CustomText';

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
export default class FilterCartao extends Component {
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
      cuisine: [
        {title: 'Professor', picked: true},
        {title: 'Motorista', picked: false},
        {title: 'Caminhoneiro', picked: false},
        {title: 'Jogador', picked: false},
        {title: 'Encanador', picked: false},
        {title: 'Músico', picked: false},
        {title: 'Ator', picked: false},
        {title: 'Tradutor', picked: false},
        {title: 'Caminhoneiro', picked: false},
        {title: 'Jogador', picked: false},
        {title: 'Caminhoneiro', picked: false},
        {title: 'Jogador', picked: false},
        {title: 'Caminhoneiro', picked: false},
        {title: 'Jogador', picked: false},
        
      ],
    };
  }

  componentDidMount = () => {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
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

  onChangeText = (key) => (text) => {
    this.setState({
      [key]: text,
    });
  };

  onFocus = (key) => () => {
    let focusedInputs = {
      fromPriceFocused: false,
      toPriceFocused: false,
    };
    focusedInputs[key] = true;

    this.setState({
      ...focusedInputs,
    });
  };

  focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  handleFilterPress = (filters, item) => () => {
    const index = filters.indexOf(item);

    filters[index].picked = !filters[index].picked;

    this.setState({
      filters: [...filters],
    });
  };

  renderFilterItem = ({item, index}, filterArr) => (
    <FilterPicker
      key={index}
      onPress={this.handleFilterPress(filterArr, item)}
      picked={item.picked}
      title={item.title}
    />
  );

  render() {
    const {
      fromPrice,
      fromPriceFocused,
      toPrice,
      toPriceFocused,
      menu,
      cuisine,
    } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={"#00b970"}
          barStyle="white-content"
        />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Heading6 style={{fontWeight: '700'}}>Filtro de Cartão de Visita</Heading6>
            </View>
            <Subtitle1 style={styles.subtitle}>Qual tipo de Profissional?</Subtitle1>
            <View style={styles.rowWrap}>
              {menu.map((item, index) =>
                this.renderFilterItem({item, index}, menu),
              )}
            </View>

            <Subtitle1 style={[styles.subtitle, styles.mt8]}>Escolha a categoria abaixo</Subtitle1>
            <View style={{flexDirection: 'row', flexWrap: 'wrap',   justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 16}}>
              {cuisine.map((item, index) => (
                <FilterPicker
                  key={index}
                  onPress={this.handleFilterPress(cuisine, item)}
                  picked={item.picked}
                  title={item.title}
                />
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button onPress={this.goBack} title="Aplicar Filtros" rounded />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
