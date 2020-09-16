import styled from 'styled-components/native';

//import icons
import { FontAwesome5 } from '@expo/vector-icons';

// import components
import {Heading6, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import { Ionicons as Ionicon } from "@expo/vector-icons";

import {SmallText, Caption} from '../../components/text/CustomText';

import { TextInputMask } from 'react-native-masked-text';

import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';

import  Button  from '../../components/buttons/Button';


export const SafeBackground = styled.SafeAreaView`
    flex:1;
    background: ${props => props.theme.background} 
`;

export const SafeBackgroundPublish = styled.SafeAreaView`
    flex:1;
    background: ${props => props.theme.backgroundPublish};
`;

export const TextDays = styled.Text`
    color: ${props => props.theme.color}; 
    fontWeight: 800; 
    paddingTop:20px; 
    paddingLeft: 5px
`

export const TextFilter = styled.Text`
    padding:10px; 
    color: ${props => props.theme.colorFilter}
`

export const FilterUnderContainer = styled.View`
    paddingVertical: 26px;
    paddingHorizontal: 24px;
    backgroundColor: ${props => props.theme.background};
`

export const TouchableFilter = styled.TouchableOpacity`
    borderRadius:30px; 
    backgroundColor: ${props => props.theme.selectedFilter}; 
    margin: 7px
`

export const TouchableFilterUnselected = styled.TouchableOpacity`
    borderRadius:30px; 
    backgroundColor: ${props => props.theme.unselectedFilter}; 
    margin: 7px
`

export const InputForm = styled.TextInput`
    borderBottomWidth:0.5px;
    color: ${props => props.theme.inversePallete};
    borderBottomColor: ${props => props.theme.color}
`
export const CaptionTerms = styled(Caption)`
    paddingBottom: 12px;
    textAlign: left;
    color: ${props => props.theme.inversePallete}
`

export const TextBlock = styled.Text`
    paddingBottom: 24px;
    fontWeight: 400;
    fontSize: 14px;
    lineHeight: 22px;
    color: ${props => props.theme.color};
    letterSpacing: 0.4px;
    textAlign: left;
`

export const ContainerButton = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
    padding: 16px;
    width: 100%;
    backgroundColor: ${props => props.theme.background}
`

export const HeadTerm = styled.Text`
    paddingBottom: 16px;
    fontWeight: 700;
    fontSize: 16px;
    color: ${props => props.theme.inversePallete};
    letterSpacing: 0.2px;
    textAlign: left
`

export const InputFormComponent = styled(UnderlineTextInput)`
    borderBottomWidth:0.5px;
    color: ${props => props.theme.inversePallete};
    borderBottomColor: ${props => props.theme.color}
`

export const InputFormMask = styled(TextInputMask)`
    borderBottomWidth:0.5px;
    color: ${props => props.theme.inversePallete};
    borderBottomColor: ${props => props.theme.color}
`

export const ChooseOption = styled.TouchableOpacity`
    backgroundColor: ${props => props.theme.color};
    width:18px; 
    height:18px;
    borderRadius:30px
`
export const Subtitle2Publish = styled(Subtitle2)`
    marginLeft: 5px;
    paddingBottom: 2px; 
    fontWeight: 100;
    color: ${props => props.theme.color}; 
    textAlign: left
`

export const Subtitle2EditProfile = styled(Subtitle2)`
    color: ${props => props.theme.color};
    textAlign: left
`


export const TitleChangeColor = styled.Text`
    color:${props => props.theme.color}
`
export const PublishTouchable = styled.TouchableOpacity`
    backgroundColor: ${props => props.theme.inverseContainerCall};
    width:100px; 
    height:30px; 
    borderRadius:30px
`

export const CategoryAndSub = styled.Text`
    fontWeight: 700; 
    color: ${props => props.theme.color}; 
    fontSize:20px; 
    marginLeft:17px; 
    marginTop:10px; 
    marginBottom:15px
`

export const SafeViewPublish = styled.View`
    flex:1;
    background: ${props => props.theme.backgroundPublish} 
`;

export const ViewCircle = styled.View`
    width: 16px;
    height: 16px;
    borderRadius: 8px;
    background: ${props => props.theme.background}
`

export const SafeAnuncioView = styled.SafeAreaView`
    flex: 1;
    background: ${props => props.theme.background},
    borderTopRightRadius: 20px;
    borderTopLeftRadius: 20px;
`


export const AnuncioContainer = styled.View`
    width: 336px;
    height: 170px; 
    marginBottom:5px; 
    marginTop: 10px; 
    borderRadius: 10px; 
    backgroundColor: ${props => props.theme.backgroundColor}; 
`

export const CallAndMessageContainer = styled.View`
    flexDirection: row;
    justifyContent: space-between; 
    width: 329px; 
    height:80px; 
    marginLeft:16px; 
    padding:20px;  
    background: ${props => props.theme.containerCall}; 
    borderRadius:20px
`
export const TouchableResponsive = styled.TouchableOpacity`
    flexDirection: row;
    padding:10px; 
    alignItems: center; 
    width: 45%; 
    height: 100%; 
    borderRadius: 20px; 
    background: ${props => props.theme.inverseContainerCall}
`

export const ButtonIconContainer = styled.View`
    position: absolute;
    top: 16px;
    borderRadius: 18;
    background: ${props => props.theme.backgroundColor};
    left: 16px;
`

export const Title = styled.Text`
fontSize:17px;
marginTop:20px;
fontWeight: bold; 
marginLeft:20px; 
color:${props => props.theme.colorTitle}
`

export const ValueField = styled.Text`
    color:${props => props.theme.colorTitle};
    fontWeight: bold
`

export const ValueFieldPrincipal = styled.Text`
    color:${props => props.theme.inversePallete}
    fontWeight: 700,
    
`

export const TextDescription = styled(SmallText)`
    paddingBottom: 8;
    textAlign: left;
    color: ${props => props.theme.inversePallete}

`


export const TextDescription2 = styled(SmallText)`
    paddingBottom: 8;
    textAlign: left;
    color: ${props => props.theme.color}

`

export const TextDescription3 = styled(SmallText)`
    paddingBottom: 8;
    textAlign: left;
    color: ${props => props.theme.colorCallAndMessage}

`
export const IconResponsiveCallAndMessage = styled(FontAwesome5)`
    color: ${props => props.theme.colorCallAndMessage}
`

export const TouchableDetails = styled.TouchableOpacity`
    paddingLeft: 10px; 
    backgroundColor: ${props => props.theme.colorContainerDetails}; 
    width:100px; 
    height:20px; 
    borderRadius: 5px;
    marginTop: 24px;
    marginLeft: 31px
`

export const TextDetails = styled.Text`
    color: ${props => props.theme.background}
`

export const TextTheme = styled.Text`
    color: ${props => props.theme.inversePallete}
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
    color: ${props => props.theme.colorTitle}
`
export const IconResponsiveNOBACK = styled(FontAwesome5)`
    color: ${props => props.theme.color}
`

export const Description = styled.Text`
    textAlign: center; 
    fontSize:12px; 
    marginTop:20px; 
    marginRight:170px; 
    fontWeight: 500; 
    marginLeft:25px; 
    color:${props => props.theme.inversePallete}
`
export const ViewCartao = styled.View`
    position: absolute;
    left: 0;
    backgroundColor: ${props => props.theme.background};
    right: 0;
    top: 0;
    height: 100%;
`

export const Favorite = styled.Text`
    color: ${props => props.theme.inversePallete}; 
    fontSize:30px
`

export const Heading = styled(Heading6)`
    fontWeight: 700,
    color: ${props => props.theme.color}
`

export const HeadingInverse = styled(Heading6)`
    fontWeight: 700,
    color: ${props => props.theme.inversePallete}
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

export const Sub1Filter = styled(Subtitle1)`
    color: ${props => props.theme.color};
    textAlign: left;
    padding: 16px
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



export const PlusContainer = styled.TouchableOpacity`
    marginRight:5px; 
    borderRadius:25px; 
    alignItems: center; 
    justifyContent: center;
    width:40px; 
    height:40px; 
    backgroundColor: ${props => props.theme.backgroundColor}
` 

export const PlusIcon = styled(FontAwesome5)`
    color: ${props => props.theme.colorTitle}
` 

export const ItemContainer = styled.View`
    marginVertical: 4;
    background: ${props => props.theme.backgroundColor2}
`

export const ViewTopForm = styled.View`
    marginVertical: 4px;
    marginHorizontal: 12px;
    borderRadius: 16px;
    background: ${props => props.theme.backgroundColor2}
`
export const ButtonCustomized = styled(Button)`
    justifyContent: center;
    alignItems: center;
    background: ${props => props.theme.color};
    borderRadius: 4px
`