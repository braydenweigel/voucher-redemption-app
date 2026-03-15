import Header from "@/lib/components/lib/header";
import SafeAreaPage from "@/lib/components/lib/page";
import { Theme, useTheme } from "@/lib/hooks/use-theme-context";
import { RootState } from "@/lib/store/store";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { SlidersHorizontal, CircleX, CircleCheck, Search } from 'lucide-react-native'
import { Voucher } from "@/lib/store/vouchersSlice";
import { useMemo, useState } from "react";
import { filterVouchers, initialFilter, VoucherFilters } from "@/lib/utils/filters";
import { Input } from "@/lib/components/lib/input";

function convertDate(date: Date | null){
    if (!date) return ""

    return new Date(date).toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    })
}

export default function VouchersPage(){
    const { theme } = useTheme()
    const { data, loading, error } = useSelector((state: RootState) => state.vouchers)
    const [filter, setFilter] = useState<VoucherFilters>(structuredClone(initialFilter))

    const styles = getStyles(theme)

    const sortedData = [...data].sort((a, b) => (a.voucherid < b.voucherid ? -1 : 1))

    const displayVouchers = useMemo(() => {
        if (!sortedData) return []
        return filterVouchers(sortedData, filter)
    }, [sortedData, filter])


    return (
        <SafeAreaPage>
            <Header text="Vouchers">
                <Pressable ><SlidersHorizontal color={theme.text_primary}/></Pressable>
            </Header>
            <Input onChangeText={(s) => {
                    setFilter(filter => ({
                        ...filter,
                        id: s
                    }))
                }
                }
                style={styles.input}
                placeholder="Search by Voucher ID"
                
            >
                <Search color={theme.text_muted}/>
            </Input>
            <View style={styles.tableHead}>
                <Text style={{color: theme.text_primary, flex: 0.3, fontSize: 16, fontWeight: 500}}>Voucher ID</Text>
                <Text style={{color: theme.text_primary, flex: 0.4, textAlign: "center", fontSize: 16, fontWeight: 500}}>Redeemed</Text>
                <Text style={{color: theme.text_primary, flex: 0.3, textAlign: "right", fontSize: 16, fontWeight: 500}}>Redeemed At</Text>
            </View>
            <FlatList
                data={displayVouchers}
                renderItem={({item}) => <VoucherRow v={item}/>}
                keyExtractor={item => item.voucherid}
                style={{marginBottom: 50}}
            />
        </SafeAreaPage>
    )
}

type VoucherRowProps = {
    v: Voucher
}

function VoucherRow({v}: VoucherRowProps){
    const { theme } = useTheme()
    const styles = getStyles(theme)
    
    return (
        <View style={styles.tableRow}>
            <Text style={{color: theme.text_primary, flex: 0.45, fontSize: 18}}>{v.voucherid}</Text>
            <View style={{flex: 0.25, alignSelf: "center",}}>{v.redeemed ? <CircleCheck color="#44ef63"/> : <CircleX color="#EF4444"/>}</View>
            <Text style={{color: theme.text_primary, flex: 0.3, textAlign: "center", fontSize: 14}}>{v.redeemed ? convertDate(v.redeemedat) : null}</Text>
        </View>
    )
}


function getStyles(theme: Theme){
    return StyleSheet.create({
        tableHead: {
            flexDirection: "row",
            width: "100%",
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderColor: theme.accent_primary
        },
        tableRow: {
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: theme.accent_primary
        },
        input: {
            marginBottom: 10
        }
    })
}