import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, TextInput, Text, View, Pressable } from "react-native";
import { useAuth } from "@/lib/hooks/use-auth-context";
import { useState } from "react";
import { InputField, InputLabel } from "@/lib/components/lib/input";

export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useAuth()

    const handleButton = () => {
        console.log("BUTTON CLICKED")
        console.log("Email: ", email, " Password: ", password)
        signIn(email, password)
    }

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.loginCard}>
                <Text>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={t => setEmail(t)} placeholder="Email"/>

                <Text>Password</Text>
                <TextInput style={styles.input} value={password} onChangeText={t => setPassword(t)} placeholder="Password" secureTextEntry={true}/>

                <Pressable style={styles.button} onPress={handleButton}><Text style={styles.buttonText}>Sign In</Text></Pressable>
                
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginCard: {
        width: '70%',
        paddingHorizontal: '5%',
        height: '40%',
        paddingVertical: '10%',
        backgroundColor: '#f7f7f7'
    },
    button: {
        backgroundColor: "#000000",
        height: 30,
        justifyContent: "center"
    },
    buttonText: {
        color: "#FFFFFF",
        textAlign: "center"
    },
    input: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10
    }
})