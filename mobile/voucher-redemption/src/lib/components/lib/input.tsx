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
    const colorScheme = useColorScheme()

    return (
        <View style={[styles.inputView, style]}>
            <TextInput style={[styles.input, textStyle]} value={value} onChangeText={onChangeText} placeholder={placeholder} keyboardType={keyboardType} secureTextEntry={secure}/>
        </View>
    )
}

interface InputLabelProps {
    value: string
    textStyle?: StyleProp<TextStyle>
}

export function InputLabel({value, textStyle}: InputLabelProps){

    return (
        <Text style={[styles.label, textStyle]}>{value}</Text>
    )
}

const styles = StyleSheet.create({
    inputView: {
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: "#EEEEEE"
    },
    input: {
        height: 40,
        fontSize: 16
    },
    label: {
        marginBottom: 3,
        fontSize: 16
    }
})