import { useTheme } from "@/lib/hooks/use-theme-context"
import { ReactNode } from "react"
import { StyleSheet, TextInput, Text, useColorScheme, View, Pressable, StyleProp, ViewStyle, TextStyle, PressableProps } from "react-native"

type ButtonProps = PressableProps & {
    text?: string
    children?: ReactNode
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export default function Button({text, children, style, textStyle, ...props}: ButtonProps){
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        button: {
            backgroundColor: theme.accent_primary,
            height: 40,
            borderRadius: 20,
            justifyContent: "center"
        },
        buttonText: {
            color: theme.text_accent,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold"
        }
    })

    return (
        <Pressable style={[styles.button, style]} {...props}>
            {children ? children : text && (
                <Text style={[styles.buttonText, textStyle]}>{text}</Text>
            )}
        </Pressable>
    )
}
