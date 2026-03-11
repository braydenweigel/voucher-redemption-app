import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TextInput, Text, View, Pressable } from "react-native";
import { useAuth } from "@/lib/hooks/use-auth-context";
import { useState } from "react";
import { Input, InputLabel } from "@/lib/components/lib/input";
import Button from "@/lib/components/lib/button";
import Card from "@/lib/components/lib/card";
import { useTheme } from "@/lib/hooks/use-theme-context";

export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useAuth()
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        page: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background_primary
        },
        header: {
            fontWeight: "bold",
            fontSize: 18,
            color: theme.text_primary,
            textAlign: "left",
            marginTop: -5,
            marginBottom: 15
        }
    })

    const handleButton = () => {
        console.log("BUTTON CLICKED")
        console.log("Email: ", email, " Password: ", password)
        signIn(email, password)
    }

    return (
        <SafeAreaView style={styles.page}>
            <Card>
                <Text style={styles.header}>Sign In to Your Account</Text>
                <View>
                    <InputLabel value="Email"/>   
                    <Input value={email} onChangeText={setEmail} placeholder="Email" style={{marginBottom: 20}}/>

                    <InputLabel value="Password"/>   
                    <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} style={{marginBottom: 50}}/>
                </View>
                <Button text="Sign In" onPress={handleButton} style={{marginTop: "auto"}}/>
            </Card>
        </SafeAreaView>
    )
}