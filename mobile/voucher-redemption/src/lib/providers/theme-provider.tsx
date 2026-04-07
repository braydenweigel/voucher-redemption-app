import { PropsWithChildren, useEffect, useState } from "react"
import { Theme, ThemeContext, ThemeType } from "../hooks/use-theme-context"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function ThemeProvider({ children }: PropsWithChildren){
    const systemTheme = useColorScheme()
    const [themeSetting, setThemeSetting] = useState<ThemeType>("dark")

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
    name: "dark",
    status_bar: "light",
    background_primary: "#0c090c",
    background_secondary: "#2a212c",
    accent_primary: "#79697b",
    accent_secondary: "#594c5b",
    text_primary: "#fafafa",
    text_secondary: "#e7e4e7",
    text_muted: "#79697b",
    text_accent: "#fafafa",
    input: "#1d161e"
}

const light: Theme = {
    name: "light",
    status_bar: "dark",
    background_primary: "#fafafa",
    background_secondary: "#e7e4e7",
    accent_primary: "#594c5b",
    accent_secondary: "#79697b",
    text_primary: "#0c090c",
    text_secondary: "#2a212c",
    text_muted: "#594c5b",
    text_accent: "#fafafa",
    input: "#f3f1f3"
}
