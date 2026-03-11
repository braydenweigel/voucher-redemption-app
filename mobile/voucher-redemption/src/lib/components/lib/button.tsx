import { useTheme } from "@/lib/hooks/use-theme-context"
import { StyleSheet, TextInput, Text, useColorScheme, View, Pressable, StyleProp, ViewStyle, TextStyle } from "react-native"

interface ButtonProps {
    text: string | null
    onPress: () => void
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export default function Button({text = null, onPress, style, textStyle}: ButtonProps){
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        button: {
            backgroundColor: theme.accent_primary,
            height: 40,
            borderRadius: 20,
            justifyContent: "center"
        },
        buttonText: {
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: 18
        }
    })

    return (
        <Pressable style={[styles.button, style]} onPress={onPress}>
            {text && <Text style={[styles.buttonText, textStyle]}>{text}</Text>}
        </Pressable>
    )
}
