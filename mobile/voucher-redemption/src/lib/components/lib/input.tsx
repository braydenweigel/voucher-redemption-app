import { useTheme } from "@/lib/hooks/use-theme-context"
import { ReactNode } from "react"
import { StyleSheet, TextInput, Text, useColorScheme, View, StyleProp, ViewStyle, TextStyle, TextInputProps } from "react-native"

type InputProps = TextInputProps & {
    children?: ReactNode
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export function Input({children, style, textStyle, ...props}: InputProps){
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        inputView: {
            paddingHorizontal: 15,
            borderRadius: 20,
            backgroundColor: theme.input,
            borderWidth: 1,
            borderColor: theme.background_secondary
        },
        input: {
            height: 40,
            fontSize: 16,
            color: theme.text_primary
        }
    })

    return (
        <View style={[styles.inputView, style]}>
            <TextInput style={[styles.input, textStyle]} placeholderTextColor={theme.text_muted} {...props}/>
            {children}
        </View>
    )
}

interface InputLabelProps {
    value: string
    textStyle?: StyleProp<TextStyle>
}

export function InputLabel({value, textStyle}: InputLabelProps){
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        label: {
            marginBottom: 3,
            fontSize: 16,
            color: theme.text_primary
        }
    })

    return (
        <Text style={[styles.label, textStyle]}>{value}</Text>
    )
}

