import { useTheme } from "@/lib/hooks/use-theme-context";
import { X } from "lucide-react-native";
import { ReactNode } from "react";
import { StyleSheet, View, Modal, ModalProps, Pressable, StyleProp, ViewStyle } from "react-native";

type DialogProps = ModalProps & {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode
    style?: StyleProp<ViewStyle>
}

export default function Dialog({open, setOpen, children, style, ...props}: DialogProps){
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "column",
            width: 360,
            height: "auto",
            margin: "auto",
            minHeight: 120,
            backgroundColor: theme.background_primary,
            borderWidth: 1,
            borderColor: theme.background_secondary,
            borderRadius: 20,
        },
        overlay:{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)"
        }
    })

    const handleClose = () => {
        setOpen(!open)
    }

    return (
        <Modal
            {...props}
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={() => {setOpen(false)}}
        >
            <View style={styles.overlay}>
                <View style={[styles.container, style]}>
                <Pressable onPress={handleClose} style={{position: "absolute", top: 10, right: 10, zIndex: 10}}><X color={theme.text_primary}/></Pressable>
                {children}
            </View>
            </View>
        </Modal>
    )
}