/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import components
import HeaderIconButton from '../components/navigation/HeaderIconButton';

// import Onboarding screen
import Onboarding from '../screens/onboarding/OnboardingA';

// import Welcome screen
import Welcome from '../screens/welcome/WelcomeA';

// import SignUp screen
import SignUp from '../screens/signup/Cadastro';

// import Settings screen
import Settings from '../screens/settings/Configuracoes';

// import Verification screen
import Verification from '../screens/verification/Verificação';
import EmailVerificacao from '../screens/verification/EmailVerificacao';
import SMSVerificacao from '../screens/verification/SMSVerificacao';
import TelaLoginSMS from '../screens/signin/TelaLoginSMS';

// import SignIn screen
import TelaLogin from '../screens/signin/TelaLogin';

// import ForgotPassword screen
import ForgotPassword from '../screens/forgotpassword/TelaEsqueciSenha';

//import Logout screen
import TelaLogout from '../screens/signin/TelaLogout';

// import TermsConditions screen
import TermsConditions from '../screens/terms/TermsConditionsA';

// import HomeNavigator
import HomeNavigator from './HomeNavigatorA';

import TelaPrincipalAnuncio from '../screens/anuncios/TelaPrincipalAnuncio';

// import Product screen
import TelaAnuncio from '../screens/telasAnuncios/TelaAnuncio';

import TelaCartaoVisita from '../screens/cartaoVisita/TelaCartaoVisita';

import TelaGeralCriarCartao from '../screens/cartaoVisita/TelaGeralCriarCartao';

import TelaCriarCartaoVisita from '../screens/cartaoVisita/TelaCriarCartaoVisita';

// import Categories screen
import Categories from '../screens/categories/CategoriesA';
import Category from '../screens/categories/CategoryA';


// import Checkout screen
import Checkout from '../screens/checkout/CheckoutA';

// import EditProfile screen
import EditProfile from '../screens/profile/EditProfileA';

// import DeliveryAddress screen
import DeliveryAddress from '../screens/address/DeliveryAddressA';

// import AddAddress screen
import AddAddress from '../screens/address/AddAddressA';

// import Search screen
import Search from '../screens/search/SearchB';

// import EditAddress screen
import EditAddress from '../screens/address/EditAddressA';

// import Payment screen
import PaymentMethod from '../screens/payment/PaymentMethodA';

// import AddCreditCard screen
import AddCreditCard from '../screens/payment/AddCreditCardA';

// import Notifications screen
import Notifications from '../screens/notifications/NotificationsA';

// import Orders screen
import Orders from '../screens/anuncios/CriarAnuncio';

// import AboutUs screen
import AboutUs from '../screens/about/AboutUsA';

// import colors
import Colors from '../theme/colors';
import FilterB from '../screens/search/FilterB';
import FilterCartao from '../screens/search/FilterCartao'

// MainNavigatorA Config
const SAVE_ICON = Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark';

// create stack navigator
const Stack = createStackNavigator();

// MainNavigatorA
function MainNavigatorA() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardOverlayEnabled: false,
          headerStyle: {
            elevation: 1,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: Colors.onBackground,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={
            ({navigation}) => ({ 
            headerTitleStyle: {
              color:'white'
            },
            title: 'Criar Conta',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: '#00b970'
            },

            headerLeft: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={'ios-arrow-back'}
                color={'white'}
              />
            ),
            })
          }
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="EmailVerificacao"
          component={EmailVerificacao}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SMSVerificacao"
          component={SMSVerificacao}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TelaLoginSMS"
          component={TelaLoginSMS}
          options={{headerShown: false}}
        />


        <Stack.Screen
          name="SignIn"
          component={TelaLogin}
          options={({navigation}) => ({ 
            headerTitleStyle: {
              color:'white'
            },
            title: 'Entrar na Conta',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: '#00b970'
            },

            headerLeft: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={'ios-arrow-back'}
                color={'white'}
              />
            ),
            })}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={({navigation}) => ({ 
            headerTitleStyle: {
              color:'#00b970'
            },
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            title: 'Esqueci Minha Senha',

            headerLeft: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={'ios-arrow-back'}
                color={'#00b970'}
              />
            )
          })}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{
            title: 'Termos e Condições',
          }}
        />
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TelaLogout"
          component={TelaLogout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TelaPrincipalAnuncio"
          component={TelaPrincipalAnuncio}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            title: 'All Categories',
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            title: 'Pizza',
          }}
        />
        <Stack.Screen
          name="TelaAnuncio"
          component={TelaAnuncio}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TelaCartaoVisita"
          component={TelaCartaoVisita}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TelaGeralCriarCartao"
          component={TelaGeralCriarCartao}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FilterB"
          component={FilterB}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FilterCartao"
          component={FilterCartao}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            title: 'Checkout',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({navigation}) => ({
            title: 'Edit Profile',
            headerRight: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={SAVE_ICON}
                color={Colors.primaryColor}
              />
            ),
          })}
        />
        <Stack.Screen
          name="DeliveryAddress"
          component={DeliveryAddress}
          options={({navigation}) => ({
            title: 'Delivery Address',
            headerRight: () => (
              <HeaderIconButton
                onPress={() => navigation.goBack()}
                name={SAVE_ICON}
                color={Colors.primaryColor}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            title: 'Add New Address',
          }}
        />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{
            title: 'Edit Address',
          }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{
            title: 'Payment Method',
          }}
        />
        <Stack.Screen
          name="AddCreditCard"
          component={AddCreditCard}
          options={{
            title: 'Add Credit Card',
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            title: 'Notifications',
          }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            title: 'Criar Anúncio'
          }}
        />

        <Stack.Screen
          name="TelaCriarCartaoVisita"
          component={TelaCriarCartaoVisita}
          options={{
            title: 'Criar Cartão de Visita'
          }}
        />

        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            title: 'About Us',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigatorA;
