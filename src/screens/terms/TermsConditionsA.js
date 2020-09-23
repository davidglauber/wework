/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import components
import Button from '../../components/buttons/Button';
import {Caption} from '../../components/text/CustomText';


//CSS responsivo
import { SafeBackground, CaptionTerms, TextBlock, HeadTerm, ContainerButton, Title, ValueField, TouchableDetails, TextDetails, SignUpBottom, TextBold, TextBoldGolden } from '../home/styles';

import { ThemeContext } from '../../../ThemeContext';

// import colors
import Colors from '../../theme/colors';

// TermsConditionsA Config
const APP_NAME = 'App Name';

// TermsConditionsA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  caption: {
    paddingBottom: 12,
    textAlign: 'left',
  },
  heading: {
    paddingBottom: 16,
    fontWeight: '700',
    fontSize: 16,
    color: Colors.primaryColor,
    letterSpacing: 0.2,
    textAlign: 'left',
    // writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' // iOS
  },
  textBlock: {
    paddingBottom: 24,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primaryText,
    letterSpacing: 0.4,
    textAlign: 'left',
  },
  button: {
    width: Dimensions.get('window').width/3,
    marginRight:70
  },
});

// TermsConditionsA
export default class TermsConditionsA extends Component {
  static contextType = ThemeContext

  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <SafeBackground>
        <StatusBar
          backgroundColor={this.context.dark ? '#121212' : 'white'}
          barStyle={this.context.dark ? "white-content" : "dark-content"}
        />
        <ScrollView>
          <View style={styles.content}>
            <CaptionTerms>
              Última atualização: 12 de Abril, 2020
            </CaptionTerms>
            <TextBlock>{`Please read these terms and conditions carefully, before you start using the mobile application ${APP_NAME}.`}</TextBlock>

            <HeadTerm>0. Introduction</HeadTerm>
            <TextBlock>
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                 \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
            </TextBlock>

            <HeadTerm>1. Your Content</HeadTerm>
            <TextBlock>
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
            </TextBlock>

            <HeadTerm>2. No warranties</HeadTerm>
            <TextBlock>
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
            </TextBlock>

            <HeadTerm>3. License</HeadTerm>
            <TextBlock>
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
            </TextBlock>
          </View>
        </ScrollView>

        <ContainerButton>
          <Button
            onPress={this.goBack}
            buttonStyle={styles.button}
            title="Discordar"
            outlined
          />

          <Button
            onPress={this.goBack}
            buttonStyle={styles.button}
            title="Concordar"
          />
        </ContainerButton>
      </SafeBackground>
    );
  }
}
