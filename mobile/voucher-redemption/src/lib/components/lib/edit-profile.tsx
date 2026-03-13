import { Theme, useTheme } from "@/lib/hooks/use-theme-context";
import Dialog from "./dialog";
import { StyleSheet, View, Text } from "react-native";
import Button from "./button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Input, InputLabel } from "./input";
import { Alert } from "react-native"
import { supabase } from "@/lib/supabase/supabase";

type EditProfileProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    
}

export default function EditProfile({open, setOpen}: EditProfileProps){
    const { data: user, loading, error } = useSelector((state: RootState) => state.profile)
    const { theme } = useTheme()
    const [first, setFirst] = useState(user?.first_name ?? '')
    const [last, setLast] = useState(user?.last_name ?? '')
    const [email, setEmail] = useState(user?.email ?? '')

    const styles = getStyles(theme)

    const handleCancel = () => {
        setOpen(false)
    }

    const handleSave = async () => {
        const { data, error } = await supabase.from("profiles").update({first_name: first, last_name: last}).eq("profileid", user?.profileid).select().single()

        if (error) {
            Alert.alert("Error updating profile!")
            return
        }

        //TODO: Updata profile slice
        setOpen(false)
    }

    return (
        <Dialog open={open} setOpen={setOpen} style={{position: "absolute", top: 80, alignSelf: "center"}}>
            <Text style={styles.header}>Edit Profile</Text>
            <View style={styles.content}>
                <InputLabel value="First Name"/>   
                <Input value={first} onChangeText={setFirst} placeholder="First Name" style={{marginBottom: 20}}/>

                <InputLabel value="Last Name"/>   
                <Input value={last} onChangeText={setLast} placeholder="Last Name" style={{marginBottom: 20}}/>

                <InputLabel value="Email"/>   
                <Input value={email} onChangeText={setEmail} placeholder="Email" style={{marginBottom: 20}} editable={false}/>
            </View>

            <View style={styles.footer}>
                <Button text="Cancel" style={styles.cancel} textStyle={styles.buttonText} onPress={handleCancel}/>
                <Button text="Save Changes" style={styles.save} textStyle={[styles.buttonText, {color: theme.text_primary}]} onPress={handleSave}/>
            </View>
        </Dialog>
    )
}

function getStyles(theme: Theme){
    return StyleSheet.create({
        footer: {
            display: "flex",
            flexDirection: "row",
            marginHorizontal: 10,
            gap: 8,
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 15,
            marginTop: 20
        },
        cancel: {
            paddingHorizontal: 12,
            backgroundColor: "#EF4444"
        },
        save: {
            paddingHorizontal: 12,
            backgroundColor: theme.background_secondary
        },
        buttonText: {
            fontWeight: "normal",
            fontSize: 16
        },
        header: {
            color: theme.text_primary,
            marginLeft: 15,
            marginTop: 15,
            fontSize: 20,
            fontWeight: "bold"
        },
        content: {
            padding: 15,
            display: "flex",
            flexDirection: "column",
            marginBottom: 130
        }
    })
}