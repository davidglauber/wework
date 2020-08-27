import styled from 'styled-components/native';

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
