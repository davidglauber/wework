import styled from 'styled-components/native';

//import icons
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export const SafeBackground = styled.SafeAreaView`
    flex:1;
    background: ${props => props.theme.background} 
`;

export const AnuncioContainer = styled.View`
    width: 336;
    height: 170; 
    marginBottom:5; 
    marginTop: 10; 
    borderRadius: 10; 
    backgroundColor: ${props => props.theme.backgroundColor}; 
    elevation:5; 
    shadowColor: black; 
    shadowOffset:{width:2, height:4}; 
    shadowOpacity: 0.2
`

export const Title = styled.Text`
fontSize:17px;
marginTop:20px;
fontWeight: bold; 
marginLeft:20px; 
color:${props => props.theme.color}
`

export const ValueField = styled.Text`
    color:${props => props.theme.color}
`

export const TouchableDetails = styled.TouchableOpacity`
    paddingLeft: 10; 
    backgroundColor: ${props => props.theme.color}; 
    width:100; 
    height:20; 
    borderRadius: 5;
    marginTop: 24;
    marginLeft: 31
`

export const TextDetails = styled.Text`
    color: ${props => props.theme.background}
`

export const SignUpBottom = styled.TouchableOpacity`
    borderRadius:5px;
    alignItems: center; 
    justifyContent: center; 
    width:116px;
    height:27px; 
    backgroundColor: ${props => props.theme.color}
`

export const TextBold = styled.Text`
    color: ${props => props.theme.background};
    fontWeight: bold
`

export const TextBoldGolden = styled.Text`
    color: ${props => props.theme.color};
    fontWeight: bold
`

export const IconResponsive = styled(FontAwesome5)`
    color: ${props => props.theme.color}
`

export const NavTab = styled(createBottomTabNavigator)`
    keyboardHidesTabBar: true;
    activeTintColor: ${props => props.theme.color} !important;
    inactiveTintColor: ${props => props.theme.backgroundColor} !important;
    showLabel: false;
    backgroundColor: ${props => props.theme.background} !important
`