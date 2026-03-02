import { Tabs } from "expo-router"
import { UserRound, House, Ticket } from 'lucide-react-native'

export default function TabLayout(){
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