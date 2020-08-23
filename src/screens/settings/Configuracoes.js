/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Alert,
  I18nManager,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  Switch,
  View,
} from 'react-native';

// import components
import Avatar from '../../components/avatar/Avatar';
import Divider from '../../components/divider/Divider';
import Icon from '../../components/icon/Icon';
import {Heading6, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

//import firebase
import firebase from '../../config/firebase';

// SettingsB Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';

const NOTIFICATION_OFF_ICON = IOS
  ? 'ios-notifications-off'
  : 'md-notifications-off';
const NOTIFICATION_ICON = IOS ? 'ios-notifications' : 'md-notifications';

const ADDRESS_ICON = IOS ? 'ios-pin' : 'md-pin';
const PAYMENT_ICON = IOS ? 'ios-card' : 'md-card';
const ORDERS_ICON = IOS ? 'ios-list' : 'md-list';
const VISIT_CARD = IOS ? 'ios-albums' : 'ios-albums';

const ABOUT_ICON = IOS ? 'ios-finger-print' : 'md-finger-print';
const UPDATE_ICON = IOS ? 'ios-cloud-download' : 'md-cloud-download';
const TERMS_ICON = IOS ? 'ios-paper' : 'md-paper';

const ADD_ICON = IOS ? 'ios-add-circle-outline' : 'md-add-circle-outline';
const LOGOUT_ICON = IOS ? 'ios-exit' : 'md-exit';

// SettingsB Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  profileContainer: {
    // height: 88
    paddingVertical: 16,
  },
  leftSide: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileInfo: {
    paddingLeft: 16,
  },
  name: {
    fontWeight: '500',
    textAlign: 'left',
  },
  email: {
    paddingVertical: 2,
  },
  sectionHeader: {
    paddingTop: 16,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  sectionHeaderText: {
    textAlign: 'left',
  },
  setting: {
    height: 48,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    width: 24,
    height: 24,
  },
});

// SectionHeader Props
type SectionHeadreProps = {
  title: string,
};

// Setting Props
type SettingProps = {
  icon: string,
  setting: string,
  type: string,
  onPress: () => {},
};

// SettingsB Components
const SectionHeader = ({title}: SectionHeadreProps) => (
  <View style={styles.sectionHeader}>
    <Subtitle1 style={styles.sectionHeaderText}>{title}</Subtitle1>
  </View>
);

const Setting = ({onPress, icon, setting, type}: SettingProps) => (
  <TouchableItem onPress={onPress}>
    <View style={[styles.row, styles.setting]}>
      <View style={styles.leftSide}>
        {icon !== undefined && (
          <View style={styles.iconContainer}>
            <Icon
              name={icon}
              size={20}
              color={
                type === 'logout' ? Colors.secondaryColor : Colors.primaryColor
              }
            />
          </View>
        )}
        <Subtitle2 style={type === 'logout' && {color: Colors.secondaryColor}}>
          {setting}
        </Subtitle2>
      </View>

      {type !== 'logout' && (
        <View style={isRTL && {transform: [{scaleX: -1}]}}>
          <Icon
            name="ios-arrow-forward"
            size={16}
            color="rgba(0, 0, 0, 0.16)"
          />
        </View>
      )}
    </View>
  </TouchableItem>
);

// SetingsB
export default class Configuracoes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationsOn: true,
      status:null,
      emailUser:'',
      nomeUser:'',
      dataNascimento:'',
      fotoPerfil:''
    };
  }




  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(user => {
      if(user.uid !== null || user.uid !== undefined || user.uid !== '') {
        firebase.firestore().collection('usuarios').doc(user.uid).onSnapshot(documentSnapshot => {
          console.log('User data: ', documentSnapshot.data());
          this.setState({status: true})
          this.setState({emailUser: documentSnapshot.data().email})
          this.setState({nomeUser: documentSnapshot.data().nome})
          this.setState({dataNascimento: documentSnapshot.data().dataNascimento})
          this.setState({fotoPerfil: documentSnapshot.data().photoProfile})
        })
      } 
      
      if(user.uid == null || user.uid == undefined || user.uid == ''){
        return null
      }
    })

  }














  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  toggleNotifications = (value) => {
    this.setState({
      notificationsOn: value,
    });
  };

  sair() {
    const e = this;
        e.props.navigation.navigate('TelaLogout')
  }

  logout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que quer sair?',
      [
        {text: 'Cancelar', onPress: () => {}, style: 'cancel'},
        {text: 'Sim, quero sair', onPress: () => this.sair()}
      ],
      {cancelable: false},
    );
  };

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>Configurações</Heading6>
          </View>

          <TouchableItem useForeground onPress={this.navigateTo('EditProfile')}>
            <View style={[styles.row, styles.profileContainer]}>
              <View style={styles.leftSide}>
                {this.state.fotoPerfil == '' ?
                  <Image style={{borderRadius:50, width:60, height:60}} source={require('../../assets/img/profile_1.jpeg')}
                  />
                  :
                  <Image
                    source={{uri: this.state.fotoPerfil}}
                    style={{borderRadius:50, width:60, height:60}}
                  />
                }
                <View style={styles.profileInfo}>
                  <Subtitle1 style={styles.name}>{this.state.nomeUser}</Subtitle1>
                  <Subtitle2 style={styles.email}>
                    {this.state.emailUser}
                  </Subtitle2>
                  <Subtitle2 style={styles.email}>
                    {this.state.dataNascimento}
                  </Subtitle2>
                </View>
              </View>
            </View>
          </TouchableItem>

          <Divider />

         {/*
          <SectionHeader title="Notificações" />
          <TouchableItem onPress={this.navigateTo('Notifications')}>
            <View style={[styles.row, styles.setting]}>
              <View style={styles.leftSide}>
                <View style={styles.iconContainer}>
                  {notificationsOn ? (
                    <Icon
                      name={NOTIFICATION_ICON}
                      size={20}
                      color={Colors.primaryColor}
                    />
                  ) : (
                    <Icon
                      name={NOTIFICATION_OFF_ICON}
                      size={20}
                      color={Colors.primaryColor}
                    />
                  )}
                </View>
                <Subtitle2>Notifications</Subtitle2>
              </View>

              <Switch
                trackColor={{
                  true: IOS && Colors.primaryColor,
                }}
                thumbColor={IOS ? Colors.onPrimaryColor : Colors.primaryColor}
                value={notificationsOn}
                onValueChange={this.toggleNotifications}
              />
            </View>
          </TouchableItem>

          */}

        {/*  <SectionHeader title="Address" />
          <Setting
            onPress={this.navigateTo('DeliveryAddress')}
            icon={ADDRESS_ICON}
            setting="Set Delivery Address"
          />
        */}
        

          <SectionHeader title="Planos" />
          <Setting
            onPress={this.navigateTo('PaymentMethod')}
            icon={PAYMENT_ICON}
            setting="Escolha o Seu Plano"
          />

          <SectionHeader title="Anúncios & Cartões de Visita" />
          <Setting
            onPress={this.navigateTo('TelaPrincipalAnuncio')}
            icon={ORDERS_ICON}
            setting="Meus Anúncios"
          />
          <Setting
            onPress={this.navigateTo('TelaGeralCriarCartao')}
            icon={VISIT_CARD}
            setting="Meus Cartões de Visita"
          />

          <SectionHeader title="Sobre" />
          <Setting
            onPress={this.navigateTo('AboutUs')}
            icon={ABOUT_ICON}
            setting="Quem Nós Somos"
          />

        {/* <Setting icon={UPDATE_ICON} setting="App Updates" /> */}

          <Setting
            onPress={this.navigateTo('TermsConditions')}
            icon={TERMS_ICON}
            setting="Termos & Condições"
          />

          <SectionHeader title="Sair" />
          {/* <Setting icon={ADD_ICON} setting="Add Account" /> */}
          <Setting
            onPress={() => this.logout()}
            icon={LOGOUT_ICON}
            setting="Sair"
            type="logout"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
