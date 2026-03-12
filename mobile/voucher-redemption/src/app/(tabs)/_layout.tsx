import { useTheme } from "@/lib/hooks/use-theme-context"
import { fetchProfile } from "@/lib/store/profileSlice"
import { AppDispatch } from "@/lib/store/store"
import { fetchVouchers } from "@/lib/store/vouchersSlice"
import { Tabs } from "expo-router"
import { UserRound, House, Ticket } from 'lucide-react-native'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TabLayout(){
    const { theme } = useTheme()
    const insets = useSafeAreaInsets()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchProfile())
        dispatch(fetchVouchers())
    }, [dispatch])


    return (
        <Tabs screenOptions={{ 
            headerShown: false,
            tabBarItemStyle: {
                paddingVertical: 10
            },
            tabBarStyle: {
                backgroundColor: theme.background_secondary,
                position: "absolute",
                bottom: insets.bottom,
                left: 20,
                right: 20,
                height: 60,
                borderRadius: 30,
                borderTopWidth: 0,
                elevation: 5, // Android shadow
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 5 },
                marginHorizontal: 10
            }, 
            tabBarActiveTintColor: theme.text_primary,
            tabBarInactiveTintColor: theme.accent_secondary
        }}>
            <Tabs.Screen name="index" options={{ 
                title: 'Home',
                tabBarIcon: (({ color }) => {return <House size={28} color={color}/>})
            }}/>
            <Tabs.Screen name="vouchers" options={{ 
                title: 'Vouchers',
                tabBarIcon: (({ color }) => {return <Ticket size={28} color={color}/>}) 
            }}/>
            <Tabs.Screen name="settings" options={{ 
                title: 'Profile',
                tabBarIcon: (({ color }) => {return <UserRound size={28} color={color}/>}) 
            }}/>
        </Tabs>
    )
}