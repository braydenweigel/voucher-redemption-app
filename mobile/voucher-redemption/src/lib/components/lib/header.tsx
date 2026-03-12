import { useTheme } from "@/lib/hooks/use-theme-context";
import { ReactNode } from "react";
import { StyleSheet, View, Text, TextProps, ViewProps, ViewStyle, StyleProp, TextStyle } from "react-native";

type HeaderProps = ViewProps & {
    text: string
    children?: ReactNode
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export default function Header({ text, children, style, textStyle, ...props }: HeaderProps) {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        header: {
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: theme.text_primary,
            paddingVertical: 5,
            marginBottom: 10
        },
        text:{
            flex: 1,
            fontSize: 28,
            color: theme.text_primary
        }
    })

    return (
        <View style={[styles.header, style]} {...props}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
            {children}
        </View>
    )
}