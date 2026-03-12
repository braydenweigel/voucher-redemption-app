import Button from "@/lib/components/lib/button";
import Header from "@/lib/components/lib/header";
import SafeAreaPage from "@/lib/components/lib/page";
import { useAuth } from "@/lib/hooks/use-auth-context";
import { useTheme } from "@/lib/hooks/use-theme-context";
import { RootState } from "@/lib/store/store";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Pencil } from "lucide-react-native";
import ThemeToggle from "@/lib/components/lib/theme-toggle";


export default function SettingsPage(){
    const { signOut } = useAuth()
    const { theme, currentTheme, setTheme } = useTheme()
    const { data, loading, error } = useSelector((state: RootState) => state.profile)

    const handleButton = () => {
        console.log("SIGNING OUT")
        signOut()
    }


    return (
        <SafeAreaPage>
            <Header text="Profile">
                <Pencil color={theme.text_primary}/>
            </Header>
            <View style={{}}>
                <Text style={{color: theme.text_primary, fontSize: 20, marginBottom: 5}}>{data?.first_name} {data?.last_name}</Text>
                <Text style={{color: theme.text_primary, fontSize: 18, marginBottom: 5}}>{data?.email}</Text>
            </View>
            <Header text="Settings"/>
            <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                <Text style={{color: theme.text_primary, fontSize: 20, flex: 1}}>Theme</Text>
                <ThemeToggle/>
            </View>
            
            <Button text="Sign Out" onPress={handleButton}/>
        </SafeAreaPage>
    )
}
