import styled from 'styled-components/native';

//import icons
import { FontAwesome5 } from '@expo/vector-icons';

// import components
import {Heading6, Subtitle1} from '../../components/text/CustomText';
import { Ionicons as Ionicon } from "@expo/vector-icons";


export const SafeBackground = styled.SafeAreaView`
    flex:1;
    background: ${props => props.theme.background} 
`;

export const AnuncioContainer = styled.View`
    width: 336px;
    height: 170px; 
    marginBottom:5px; 
    marginTop: 10px; 
    borderRadius: 10px; 
    backgroundColor: ${props => props.theme.backgroundColor}; 
    elevation:5; 
    shadowColor: black; 
    shadowOffset:{width:2px, height:4px}; 
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
    paddingLeft: 10px; 
    backgroundColor: ${props => props.theme.color}; 
    width:100px; 
    height:20px; 
    borderRadius: 5px;
    marginTop: 24px;
    marginLeft: 31px
`

export const TextDetails = styled.Text`
    color: ${props => props.theme.background}
`

export const SwipeLeft = styled.View`
    borderTopWidth: 0px;
    justifyContent: center; 
    alignItems: center;
    height: 28px;
    borderRadius: 4px;  
    paddingHorizontal: 8px; 
    backgroundColor: ${props => props.theme.color}
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
export const ViewCartao = styled.View`
    position: absolute;
    left: 0;
    backgroundColor: ${props => props.theme.background};
    right: 0;
    top: 0;
    height: 100%;
`

export const Heading = styled(Heading6)`
    fontWeight: 700,
    color: ${props => props.theme.color}
`

export const HeadingSetting = styled(Heading6)`
    fontWeight: 700;
    paddingTop: 16;
    paddingBottom: 16;
    fontWeight: 700;
    textAlign: left;
    color: ${props => props.theme.color}
`

export const NameUserSetting = styled(Subtitle1)`
    fontWeight: 500;
    textAlign: left;
    color: ${props => props.theme.color}
`

export const EmailUserSetting = styled(Subtitle1)`
    paddingVertical: 2;
    color: ${props => props.theme.inversePallete}
`
export const SetTextUserSetting = styled(Subtitle1)`
    paddingVertical: 2;
    fontSize: 14px
    color: ${props => props.theme.inversePallete}
`
export const SectionHeaderTextSetting = styled(Subtitle1)`
    paddingVertical: 2;
    textAlign: left;
    color: ${props => props.theme.color}
`

export const IconSetting = styled(Ionicon)`
    color: ${props => props.theme.colorSetting}
`

