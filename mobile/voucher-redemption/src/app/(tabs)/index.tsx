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
import { verifyVoucher } from "@/lib/utils/vouchers";
import CameraModal from "@/lib/components/lib/camera-modal";
import { useDispatch } from "react-redux";


export default function HomePage(){
    const { theme } = useTheme()
    const dispatch = useDispatch()
    const [voucher, setVoucher] = useState('')
    const [permission, requestPermission] = useCameraPermissions()
    const [open, setOpen] = useState(false)
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

    const handleScanClicked = () => {
        console.log("SCAN BUTTON CLICKED")
        scanLock.current = false
        setOpen(true)
    }

    const handleRedeem = async () => {
        console.log("REDEEM BUTTON CLICKED: Voucher: ", voucher)
        verifyVoucher(voucher, dispatch)
        setVoucher('')
        
    }

    return (
        <SafeAreaPage>
            {open && <CameraModal
                open={open}
                setOpen={setOpen}
                voucher={voucher}
                setVoucher={setVoucher}
                scanLock={scanLock}
            />}
            <Text style={{fontWeight: "bold", fontSize: 18, color: theme.text_primary, textAlign: "center", marginTop: 10, marginBottom: 10}}>Scan Voucher or Input Voucher ID</Text>
            <Input placeholder="Voucher ID" value={voucher} onChangeText={t => setVoucher(t)} style={{marginBottom: 15}}>
                <Pressable onPress={handleScanClicked}><ScanBarcode color={theme.text_primary}/></Pressable> 
            </Input>
            <Button onPress={handleRedeem} text="Redeem Voucher"/>
        </SafeAreaPage>
    )
}