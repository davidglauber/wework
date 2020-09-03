import React ,{createContext} from 'react';


export const ThemeContext = createContext();


export default function ThemeProviderStyle({children, darkTheme, setDarkTheme}) {

    return(
        <ThemeContext.Provider value={{darkTheme, setDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
