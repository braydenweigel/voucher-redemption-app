import { Stack } from "expo-router";
import { StyleSheet, View, Text, FlatList, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScanBarcode } from 'lucide-react-native'
import { useEffect, useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import { supabase } from "@/lib/supabase/supabase";
import SafeAreaPage from "@/lib/components/lib/page";
import Button from "@/lib/components/lib/button";
import { Input } from "@/lib/components/lib/input";
import { useTheme } from "@/lib/hooks/use-theme-context";


export default function HomePage(){
    const { theme } = useTheme()
    const [voucher, setVoucher] = useState('')
    const [permission, requestPermission] = useCameraPermissions()
    const [scanned, setScanned] = useState(true)
    const [barcodeData, setBarcodeData] = useState<string | null>(null)
    const scanLock = useRef(false)

    if (!permission){
        return <View/>
    }

    if (!permission.granted){
        return (
            <SafeAreaPage>
                <Button onPress={requestPermission} text="Grant Permission"></Button>
            </SafeAreaPage>
        )
    }

    async function verifyVoucher(id: string){
        const { data, error } = await supabase
                .from('vouchers')
                .select()
                .eq("voucherid", id)
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

        Alert.alert(
            "Redeem Voucher?", 
            undefined, 
            [
                { text: "Cancel", style: "cancel" },
                { text: "Redeem", onPress: () => redeemVoucher(id) }
            ]
        )
        
    }

    async function redeemVoucher(id: string){
        const { error: updateError } = await supabase
            .from('vouchers')
            .update({ redeemed: true })
            .eq('voucherid', id)

        if (updateError){
            Alert.alert("Error redeeming voucher!")
            return
        }

        Alert.alert("Voucher Redeemed!")
        setVoucher('')      
    }

    const handleScan = () => {
        console.log("SCAN BUTTON CLICKED")
        scanLock.current = false
        setScanned(false)
    }

    const handleRedeem = async () => {
        console.log("REDEEM BUTTON CLICKED: Voucher: ", voucher)
        verifyVoucher(voucher)
        
    }

    const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
        if (scanLock.current) return 

        scanLock.current = true
        setScanned(true)
        setBarcodeData(data)
        setVoucher(data)

        console.log("Barcode type:", type)
        console.log("Barcode data:", data)

        verifyVoucher(data)
    }



    return (
        <SafeAreaPage>
            {!scanned && <CameraView 
                style={{flex: 1}} 
                facing="back" 
                barcodeScannerSettings={{barcodeTypes: ["code128"]}} 
                onBarcodeScanned={!scanLock.current ? handleBarcodeScanned : undefined}
            />}
            <Input placeholder="Voucher ID" value={voucher} onChangeText={t => setVoucher(t)} style={{marginBottom: 15}}>
                <Pressable onPress={handleScan}><ScanBarcode color={theme.text_primary}/></Pressable> 
            </Input>
            <Button onPress={handleRedeem} text="Redeem Voucher"/>
        </SafeAreaPage>
    )
}