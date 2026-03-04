import { Stack } from "expo-router";
import { StyleSheet, View, Text, FlatList, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScanBarcode } from 'lucide-react-native'
import { useEffect, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import { supabase } from "@/lib/supabase/supabase";

export default function HomePage(){
    const [voucher, setVoucher] = useState('')
    const [permission, requestPermission] = useCameraPermissions()

    if (!permission){
        return <View/>
    }

    if (!permission.granted){
        return (
            <SafeAreaView style={styles.page}>
                <Pressable style={styles.button} onPress={requestPermission}><Text style={styles.buttonText}>Grant Permission</Text></Pressable>
            </SafeAreaView>
        )
    }

    const handleScan = () => {
        console.log("SCAN BUTTON CLICKED")
    }

    const handleRedeem = async () => {
        console.log("REDEEM BUTTON CLICKED: Voucher: ", voucher)
      
        const { data, error } = await supabase
            .from('vouchers')
            .select()
            .eq("voucherid", voucher)
            .limit(1)
            .single()

        if (error){
            Alert.alert("Voucher does not exist!")
            return 
        }

        if (data.redeemed){
            Alert.alert("Voucher has already been redeemed!")
            return
        }

        const { error: updateError } = await supabase
            .from('vouchers')
            .update({ redeemed: true })
            .eq('voucherid', data.voucherid)

        if (updateError){
            Alert.alert("Error redeeming voucher!")
            return
        }

        Alert.alert("Voucher Redeemed!")
       
    }

    return (
        <SafeAreaView style={styles.page}>
            <CameraView style={{flex: 1}} facing="back" barcodeScannerSettings={{barcodeTypes: ["code128"]}} onBarcodeScanned={handleRedeem}/>
            <View style={styles.voucherInput}>
                <TextInput placeholder="Voucher ID" value={voucher} onChangeText={t => setVoucher(t)}/>
                <Pressable onPress={handleScan}><ScanBarcode color={"#000000"}/></Pressable> 
            </View> 
            <Pressable style={styles.button} onPress={handleRedeem}><Text style={styles.buttonText}>Redeem Voucher</Text></Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingVertical: '10%',
        
    },
    voucherInput: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between"
        
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