import { SplashScreenController } from "@/lib/components/auth/splash-screen-controller"
import { AuthProvider } from "@/lib/providers/auth-provider"
import { Stack } from "expo-router"
import { useAuth } from "@/lib/hooks/use-auth-context"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useEffect } from "react"

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

export default function RootLayout(){

    return (
        <AuthProvider>
            <SplashScreenController/>
            <SafeAreaProvider>
                <RootNavigator/>
            </SafeAreaProvider>
        </AuthProvider>
    )
}