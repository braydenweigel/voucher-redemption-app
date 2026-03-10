import { StyleSheet, TextInput, Text, useColorScheme, View, Pressable, Button, StyleProp, ViewStyle, TextStyle } from "react-native"

interface ButtonProps {
    text: string | null
    onPress: () => void
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export default function CustomButton({text = null, onPress, style, textStyle}: ButtonProps){
    return (
        <Pressable style={[styles.button, style]} onPress={onPress}>
            {text && <Text style={[styles.buttonText, textStyle]}>{text}</Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#000000",
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