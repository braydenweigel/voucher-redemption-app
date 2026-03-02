import { useAuth } from "@/lib/hooks/use-auth-context";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsPage(){
    const { signOut } = useAuth()

    const handleButton = () => {
        console.log("SIGNING OUT")
        signOut()
    }

    return (
            <SafeAreaView style={styles.page}>
                <Pressable style={styles.button} onPress={handleButton}><Text style={styles.buttonText}>Sign Out</Text></Pressable>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingVertical: '10%',
        
    },
    button: {
        backgroundColor: "#000000",
        height: 30,
        justifyContent: "center"
    },
    buttonText: {
        color: "#FFFFFF",
        textAlign: "center"
    }
})