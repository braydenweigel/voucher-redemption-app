import { useAuth } from "@/lib/hooks/use-auth-context";
import { RootState } from "@/lib/store/store";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function SettingsPage(){
    const { signOut } = useAuth()
    const { data, loading, error } = useSelector((state: RootState) => state.profile)

    const handleButton = () => {
        console.log("SIGNING OUT")
        signOut()
    }


    return (
        <SafeAreaView style={styles.page}>
            <Text>First Name: {data?.first_name}</Text>
            <Text>Last Name: {data?.last_name}</Text>
            <Text>Email: {data?.email}</Text>

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
        justifyContent: "center",
        marginTop: 15
    },
    buttonText: {
        color: "#FFFFFF",
        textAlign: "center"
    }
})