import { PropsWithChildren, useEffect, useState } from "react"
import { Theme, ThemeContext, ThemeType } from "../hooks/use-theme-context"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function ThemeProvider({ children }: PropsWithChildren){
    const systemTheme = useColorScheme()
    const [themeSetting, setThemeSetting] = useState<ThemeType>("system")

    let activeTheme = light

    if (themeSetting === "system"){
        if (systemTheme === "light"){
            activeTheme = light
        } else {
            activeTheme = dark
        }

    } else {
        if (themeSetting === "light"){
            activeTheme = light
        } else {
            activeTheme = dark
        }
    }


    useEffect(() => {
        loadTheme()
    }, [])

    const loadTheme = async () => {
        const saved = await AsyncStorage.getItem("theme")
        if (saved) setThemeSetting(saved as ThemeType)
    }

    const updateTheme = async (value: ThemeType) => {
        setThemeSetting(value)
        await AsyncStorage.setItem("theme", value)
    }

    return (
        <ThemeContext.Provider
            value={
                {
                    theme: activeTheme,
                    currentTheme: themeSetting,
                    setTheme: updateTheme
                }
            }
        >
            {children}
        </ThemeContext.Provider>
    )
}

const dark: Theme = {
    background_primary: "#011D17",
    background_secondary: "#022C22",
    accent_primary: "#6EE7B7",
    accent_secondary: "#059669",
    text_primary: "#FFFFFF",
    text_secondary: "#FFFFFF"
}

const light: Theme = {
    background_primary: "#F6FEFA",
    background_secondary: "#E3FCEF",
    accent_primary: "#059669",
    accent_secondary: "#6EE7B7",
    text_primary: "#022C22",
    text_secondary: "#022C22"
}
