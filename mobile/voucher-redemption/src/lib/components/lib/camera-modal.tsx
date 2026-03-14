import { useTheme } from "@/lib/hooks/use-theme-context";
import { verifyVoucher } from "@/lib/utils/vouchers";
import { CameraView } from "expo-camera";
import React from "react";
import { StyleSheet, View, Modal, Text, ModalProps, Pressable } from "react-native";
import { X } from 'lucide-react-native'
import Dialog from "./dialog";
import { useDispatch } from "react-redux";

type CameraModalProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    voucher: string
    setVoucher: React.Dispatch<React.SetStateAction<string>>
    scanLock: React.RefObject<boolean>
}

export default function CameraModal({ open, setOpen, voucher, setVoucher, scanLock }: CameraModalProps){
    const { theme } = useTheme()
    const dispatch = useDispatch()

    const styles = StyleSheet.create({
        cameraContainer: {
            flex: 1, 
            height: 360,
            margin: 15,
            marginTop: 40,
            borderRadius: 20,
            overflow: "hidden"
        },
        camera: {
            flex: 1
        }
    })

    const handleClose = () => {
        setOpen(false)
    }

    const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
            if (scanLock.current) return 
    
            scanLock.current = true
            setOpen(false)
            setVoucher(data)
    
            console.log("Barcode type:", type)
            console.log("Barcode data:", data)
    
            verifyVoucher(data, dispatch)
            setVoucher('')
        }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={() => {setOpen(false)}}
            

        >
            <Dialog open={open} setOpen={setOpen} style={{height: 360}}>
                <View style={styles.cameraContainer}>
                    <CameraView 
                        style={styles.camera} 
                        facing="back" 
                        barcodeScannerSettings={{barcodeTypes: ["code128"]}} 
                        onBarcodeScanned={!scanLock.current ? handleBarcodeScanned : undefined}
                    />
                </View>
            </Dialog>
        </Modal>
    )
}