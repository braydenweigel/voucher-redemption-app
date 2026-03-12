import { useTheme } from "@/lib/hooks/use-theme-context";
import { current } from "@reduxjs/toolkit";
import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";



export default function ThemeToggle(){
    const { theme} = useTheme()

    const width = 75

    const styles = StyleSheet.create({
        view: {
            width: width * 3,
            height: 40,
            backgroundColor: theme.background_secondary,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center"
        }
    })

    return (
        <View style={styles.view}>
            <ThemeButton themeID="light" title="Light" width={width}/>
            <ThemeButton themeID="dark" title="Dark" width={width}/>
            <ThemeButton themeID="system" title="System" width={width}/>
        </View>
    )

}

type ThemeButtonProps = {
    themeID: "light" | "dark" | "system"
    title: "Light" | "Dark" | "System"
    width: number
}

//individual theme selector
function ThemeButton({ themeID, title, width }: ThemeButtonProps){
    const { theme, currentTheme, setTheme } = useTheme()
    const selected = themeID === currentTheme

    const styles = StyleSheet.create({
        button: {
            height: 40,
            borderRadius: 20,
            width: width,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        buttonUnselected: {
            backgroundColor: theme.background_secondary,
        },
        buttonSelected: {
            backgroundColor: theme.background_primary,
            borderWidth: 1,
            borderColor: theme.accent_primary,
        },
        text: {
            color: theme.text_primary,
            fontSize: 16,
            
        }
    })

    const handleButton = () => {
        setTheme(themeID)
    }

    return (
        <Pressable style={[styles.button, (selected ? styles.buttonSelected : styles.buttonUnselected)]} onPress={handleButton}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}