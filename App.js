/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import 'react-native-gesture-handler';
import React , {useState, createContext, useMemo}from 'react';
import {YellowBox, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import { ThemeProvider } from 'styled-components';
import themes from './src/theme';


enableScreens();

// TODO: Remove when fixed
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended',
]);

// import MainNavigatorA or MainNavigatorB to preview design differnces
import MainNavigator from './src/navigation/MainNavigatorA';
import ThemeProviderStyle from './ThemeContext';

// APP
function App() {
  const [dark, setDark] = useState(false)
  const provideTheme = useMemo(() => ({dark, setDark}), [dark, setDark])
  
  return (
      <ThemeProviderStyle darkTheme={dark} setDarkTheme={setDark}>
        <ThemeProvider theme={dark ? themes.dark: themes.light}>
            <SafeAreaProvider>
                <MainNavigator isDarkEnabled={dark}/>
            </SafeAreaProvider>
        </ThemeProvider>
      </ThemeProviderStyle>
  );
}



export default App;
