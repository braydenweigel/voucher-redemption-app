import { useTheme } from "@/lib/hooks/use-theme-context";
import { verifyVoucher } from "@/lib/utils/vouchers";
import { CameraView } from "expo-camera";
import React from "react";
import { StyleSheet, View, Modal, Text, ModalProps, Pressable } from "react-native";

type CameraModalProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    voucher: string
    setVoucher: React.Dispatch<React.SetStateAction<string>>
    scanLock: React.RefObject<boolean>
}

export default function CameraModal({ open, setOpen, voucher, setVoucher, scanLock }: CameraModalProps){
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "75%",
            backgroundColor: theme.background_secondary,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            position: "absolute",
            bottom: 0,
            flexDirection: "column"
        },
        cameraContainer: {
            flex: 1, 
            marginHorizontal: 15, 
            marginTop: 10, 
            marginBottom: 25,
            borderRadius: 24,
            overflow: "hidden"
        },
        camera: {
            flex: 1
        }
    })

    const handleClose = () => {
        setOpen(!open)
    }

    const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
            if (scanLock.current) return 
    
            scanLock.current = true
            setOpen(false)
            setVoucher(data)
    
            console.log("Barcode type:", type)
            console.log("Barcode data:", data)
    
            verifyVoucher(data)
            setVoucher('')
        }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={() => {setOpen(open)}}

        >
            <View style={styles.container}>
                <Pressable onPress={handleClose} style={{alignSelf: "flex-end", marginTop: 10, marginRight: 15}}><Text style={{color: theme.text_primary, fontSize: 18}}>Close</Text></Pressable>
                <View style={styles.cameraContainer}>
                    <CameraView 
                        style={styles.camera} 
                        facing="back" 
                        barcodeScannerSettings={{barcodeTypes: ["code128"]}} 
                        onBarcodeScanned={!scanLock.current ? handleBarcodeScanned : undefined}
                    />
                </View>

            </View>
        </Modal>
    )
}