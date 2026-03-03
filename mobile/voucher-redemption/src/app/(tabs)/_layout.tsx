import { fetchProfile } from "@/lib/store/profileSlice"
import { AppDispatch } from "@/lib/store/store"
import { Tabs } from "expo-router"
import { UserRound, House, Ticket } from 'lucide-react-native'
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function TabLayout(){
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])


    return (
        <Tabs screenOptions={{ headerShown: false}}>
            <Tabs.Screen name="index" options={{ 
                title: 'Home',
                tabBarIcon: (() => {return <House/>})
            }}/>
            <Tabs.Screen name="vouchers" options={{ 
                title: 'Vouchers',
                tabBarIcon: (() => {return <Ticket/>}) 
            }}/>
            <Tabs.Screen name="settings" options={{ 
                title: 'Profile',
                tabBarIcon: (() => {return <UserRound/>}) 
            }}/>
        </Tabs>
    )
}