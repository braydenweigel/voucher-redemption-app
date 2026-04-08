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
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

type FilterDialogProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    filter: VoucherFilters
    setFilter: React.Dispatch<SetStateAction<VoucherFilters>>
    
}

export default function FilterDialog({open, setOpen, filter, setFilter}: FilterDialogProps){
    const { theme } = useTheme()    
    const minDate = new Date(2026, 2, 1)
    const maxDate = new Date(new Date().setHours(24, 0, 0, 0))

    const styles = getStyles(theme)

    const handleReset = () => {
        setFilter(structuredClone(initialFilter))
    }

    const updateMin = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (date){
            setFilter(filter => ({
                ...filter,
                redeemedDay: {
                    ...filter.redeemedDay,
                    from: date
                }
            }))
        }
    }

    const updateMax = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (date){
            setFilter(filter => ({
                ...filter,
                redeemedDay: {
                    ...filter.redeemedDay,
                    to: date
                }
            }))
        }
    }

    

    return (
        <Dialog open={open} setOpen={setOpen} style={{position: "absolute", top: 80, alignSelf: "center", minHeight: 400}}>
            <Text style={styles.header}>Filter Vouchers</Text>
            <View style={styles.content}>
                <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
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
                {filter.redeemed ? 
                    <View style={{marginBottom: 10}}>
                        <View style={{marginBottom: 10, marginHorizontal: 20}}> 
                            <Text style={{color: theme.text_primary, fontSize: 18, fontWeight: 500, marginBottom: 5}}>From</Text>
                            <DateTimePicker mode="datetime" value={filter.redeemedDay.from} minimumDate={minDate} maximumDate={maxDate} themeVariant={theme.name} onChange={updateMin}/>
                        </View>
                        <View style={{marginBottom: 10, marginHorizontal: 20}}> 
                            <Text style={{color: theme.text_primary, fontSize: 18, fontWeight: 500, marginBottom: 5}}>To</Text>
                            <DateTimePicker mode="datetime" value={filter.redeemedDay.to} minimumDate={minDate} maximumDate={maxDate} themeVariant={theme.name} onChange={updateMax}/>
                        </View>
                    </View>
                    : null
                }
                <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                    <Text style={{color: theme.text_primary, fontSize: 18, fontWeight: 500, marginHorizontal: 10}}>Revoked</Text>
                    <Checkbox 
                        checked={filter.revoked} 
                        setChecked={() => {
                            setFilter(filter => ({
                                ...filter,
                                revoked: !filter.revoked
                            }))
                        }}
                    />
                </View>
                {filter.revoked ? 
                    <View style={{marginBottom: 10}}>
                        <View style={{marginBottom: 10, marginHorizontal: 20}}> 
                            <Text style={{color: theme.text_primary, fontSize: 18, fontWeight: 500, marginBottom: 5}}>From</Text>
                            <DateTimePicker mode="datetime" value={filter.revokedDay.from} minimumDate={minDate} maximumDate={maxDate} themeVariant={theme.name} onChange={updateMin}/>
                        </View>
                        <View style={{marginBottom: 10, marginHorizontal: 20}}> 
                            <Text style={{color: theme.text_primary, fontSize: 18, fontWeight: 500, marginBottom: 5}}>To</Text>
                            <DateTimePicker mode="datetime" value={filter.revokedDay.to} minimumDate={minDate} maximumDate={maxDate} themeVariant={theme.name} onChange={updateMax}/>
                        </View>
                    </View>
                    : null
                }
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{color: theme.text_primary, fontSize: 18, fontWeight: 500, marginHorizontal: 10}}>Not Redeemed</Text>
                    <Checkbox 
                        checked={filter.unredeemed} 
                        setChecked={() => {
                            setFilter(filter => ({
                                ...filter,
                                unredeemed: !filter.unredeemed
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