import { useTheme } from "@/lib/hooks/use-theme-context"
import { ReactNode } from "react"
import { StyleSheet, StyleProp, ViewStyle, View } from "react-native"

interface CardProps {
    children: ReactNode
    style?: StyleProp<ViewStyle>
}

export default function Card({ children, style }: CardProps) {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        card: {
            display: "flex",
            flexDirection: "column",
            width: 360,
            height: 360,
            paddingHorizontal: 30,
            paddingVertical: 30,
            backgroundColor: theme.background_primary,
            borderWidth: 1,
            borderColor: theme.background_secondary,
            borderRadius: 20,
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)"
        }
    })

    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    )
}