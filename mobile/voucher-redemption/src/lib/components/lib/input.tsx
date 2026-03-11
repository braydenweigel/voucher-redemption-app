import { useTheme } from "@/lib/hooks/use-theme-context"
import { StyleSheet, TextInput, Text, useColorScheme, View, StyleProp, ViewStyle, TextStyle } from "react-native"

interface InputProps {
    value?: string
    onChangeText: React.Dispatch<React.SetStateAction<string>>
    placeholder?: string
    keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad" | "url"
    secure?: boolean
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export function Input({value = "", onChangeText, placeholder = "", keyboardType = "default", secure = false, style, textStyle}: InputProps){
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
            <TextInput style={[styles.input, textStyle]} value={value} onChangeText={onChangeText} placeholder={placeholder} keyboardType={keyboardType} secureTextEntry={secure} placeholderTextColor={theme.text_muted}/>
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

