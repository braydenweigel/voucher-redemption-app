import { Theme, useTheme } from "@/lib/hooks/use-theme-context";
import Dialog from "./dialog";
import { StyleSheet, View, Text } from "react-native";
import Button from "./button";
import { SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Input, InputLabel } from "./input";
import { Alert } from "react-native"
import { supabase } from "@/lib/supabase/supabase";
import { updateProfileName } from "@/lib/store/profileSlice";
import { initialFilter, VoucherFilters } from "@/lib/utils/filters";
import Checkbox from "./checkbox";

type FilterDialogProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    filter: VoucherFilters
    setFilter: React.Dispatch<SetStateAction<VoucherFilters>>
    
}

export default function FilterDialog({open, setOpen, filter, setFilter}: FilterDialogProps){
    const { theme } = useTheme()
    const [checked, setChecked] = useState(false)
    

    const styles = getStyles(theme)

    const handleReset = () => {
        setFilter(structuredClone(initialFilter))
    }

    

    return (
        <Dialog open={open} setOpen={setOpen} style={{position: "absolute", top: 80, alignSelf: "center"}}>
            <Text style={styles.header}>Filter Vouchers</Text>
            <View style={styles.content}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{color: theme.text_primary, fontSize: 18, fontWeight: 500, marginHorizontal: 10}}>Redeemed</Text>
                    <Checkbox 
                        checked={filter.redeemed} 
                        setChecked={() => {
                            setFilter(filter => ({
                                ...filter,
                                redeemed: !filter.redeemed
                            }))
                        }}
                    />
                </View>
                
            </View>

            <View style={styles.footer}>
                <Button text="Reset" style={styles.reset} textStyle={styles.buttonText} onPress={handleReset}/>
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
        reset: {
            paddingHorizontal: 12,
            backgroundColor: "#EF4444",
            borderColor: "#eb1414"
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