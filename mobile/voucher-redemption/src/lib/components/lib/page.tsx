import { useTheme } from "@/lib/hooks/use-theme-context"
import { ReactNode } from "react"
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type SafeAreaPageProps = SafeAreaViewProps & {
    children?: ReactNode
    style?: StyleProp<ViewStyle>
}

export default function SafeAreaPage({children, style, ...props}: SafeAreaPageProps){
    const { theme } = useTheme()
    
    const styles = StyleSheet.create({
        page: {
            flex: 1,
            backgroundColor: theme.background_primary
        }
    })

    return (
        <SafeAreaView style={[styles.page, style]} {...props}>
            {children}
        </SafeAreaView>
    )
}
