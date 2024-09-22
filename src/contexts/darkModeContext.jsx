import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";



const DarkModeContext = createContext()

function DarkModeProvider({children}){
const [isDarkMode, setIsDarkMode]= useLocalStorageState( 
    // make the theme the same as the user operating system 
    window.matchMedia('(prefers-color-scheme:dark)').matches, "isDarkMode")

function toggleDarkMode(){
    setIsDarkMode((isDark)=>!isDark)
}


useEffect(()=>{
 
    if(isDarkMode){
        document.documentElement.classList.add('dark-mode')
    document.documentElement.classList.remove('light-mode')
    }else{
        document.documentElement.classList.add('light-mode')
        document.documentElement.classList.remove('dark-mode')
    }
 
},[isDarkMode])

    return <DarkModeContext.Provider value={{isDarkMode,toggleDarkMode}}>
        {children}
    </DarkModeContext.Provider>
}


function useDarkMode(){
    const context = useContext(DarkModeContext)
    if (context === undefined)
         throw new Error ("dark mode context has been used outside its provider")
        return  context
}

export {useDarkMode , DarkModeProvider}