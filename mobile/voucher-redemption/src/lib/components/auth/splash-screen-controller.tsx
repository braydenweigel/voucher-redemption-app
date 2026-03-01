import { useAuth } from '@/lib/hooks/use-auth-context'
import { SplashScreen } from 'expo-router'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync()

export function SplashScreenController() {
  const { isLoading } = useAuth()
  console.log("SHOWING SPLASHSCREEN")

  useEffect(() => {
    if (!isLoading) {
    SplashScreen.hideAsync()
    console.log("HIDING SPLASHSCREEN")
  }
  }, [isLoading])

  return null
}