import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TextInput, Text, View, Pressable } from "react-native";
import { useAuth } from "@/lib/hooks/use-auth-context";
import { useState } from "react";
import { Input, InputLabel } from "@/lib/components/lib/input";
import Button from "@/lib/components/lib/button";

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

                <InputLabel value="Email"/>   
                <Input value={email} onChangeText={setEmail} placeholder="Email" style={{marginBottom: 20}}/>

                <InputLabel value="Password"/>   
                <Input value={password} onChangeText={setPassword} placeholder="Password" secure={true} style={{marginBottom: 20}}/>

                <Button text="Sign In" onPress={handleButton}/>
                
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