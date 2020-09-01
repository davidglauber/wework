import React from 'react';

import { StateProvider } from '../ThemeContext';

import App from '../App';

import lightTheme from './theme/light';

import darkTheme from './theme/dark';

export default function Index() {
    const initialState = {theme: lightTheme}

    const reducer = (state, action) => {
        switch(action.type){
            case "enableDarkMode":
                return {
                    ...state,
                    theme: darkTheme
                };

                case "disableDarkMode":
                    return{
                        ...state,
                        theme: lightTheme
                    };
                    default: return state;
        }
    }

    return(
        <StateProvider initialState={initialState} reducer={reducer}>
            <App/>
        </StateProvider>
    );
}