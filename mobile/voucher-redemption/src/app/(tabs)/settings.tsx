import CustomButton from "@/lib/components/lib/button";
import SafeAreaPage from "@/lib/components/lib/page";
import { useAuth } from "@/lib/hooks/use-auth-context";
import { useTheme } from "@/lib/hooks/use-theme-context";
import { RootState } from "@/lib/store/store";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

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
            <View style={{}}>
                <Text style={{color: theme.text_primary}}>First Name: {data?.first_name}</Text>
                <Text style={{color: theme.text_primary}}>Last Name: {data?.last_name}</Text>
                <Text style={{color: theme.text_primary}}>Email: {data?.email}</Text>
            </View>
            <CustomButton text="Sign Out" onPress={handleButton} />
        </SafeAreaPage>
    )
}
