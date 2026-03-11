import { SplashScreenController } from "@/lib/components/auth/splash-screen-controller"
import { AuthProvider } from "@/lib/providers/auth-provider"
import { Stack } from "expo-router"
import { useAuth } from "@/lib/hooks/use-auth-context"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/store/store"
import { ThemeProvider } from "@/lib/providers/theme-provider"
import { StatusBar } from "expo-status-bar"
import { useTheme } from "@/lib/hooks/use-theme-context"

function RootNavigator(){
    const { isLoggedIn, getSession } = useAuth()

    useEffect(() => {
        getSession()
    }, [])

    return (
        <Stack>
            
            <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="index" options={{ headerShown: false}}/>
            </Stack.Protected>
        </Stack>
    )
}

function StatusBarController(){
    const { theme } = useTheme()

    return (
        <StatusBar style={theme.status_bar}/>
    )

}

export default function RootLayout(){
    return (
        <Provider store={store}>
            <ThemeProvider>
                <StatusBarController/>
                <AuthProvider>
                    <SplashScreenController/>
                    <SafeAreaProvider>
                        <RootNavigator/>
                    </SafeAreaProvider>
                </AuthProvider>
            </ThemeProvider>
        </Provider>
    )
}