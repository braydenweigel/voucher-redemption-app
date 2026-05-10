import Header from "@/lib/components/lib/header";
import SafeAreaPage from "@/lib/components/lib/page";
import { Theme, useTheme } from "@/lib/hooks/use-theme-context";
import { RootState } from "@/lib/store/store";
import { StyleSheet, View, Text, FlatList, Pressable, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SlidersHorizontal, CircleX, CircleCheck, Search, CircleMinus, EllipsisVertical, ArrowDownUp } from 'lucide-react-native'
import { Voucher } from "@/lib/store/vouchersSlice";
import { useMemo, useRef, useState } from "react";
import { filterVouchers, initialFilter, VoucherFilters } from "@/lib/utils/filters";
import { Input } from "@/lib/components/lib/input";
import FilterDialog from "@/lib/components/lib/filter-dialog";
import { reissueVoucher, revokeVoucher } from "@/lib/utils/vouchers";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import Card from "@/lib/components/lib/card";

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

function getVoucherAction(voucher: Voucher) {
  if (voucher.redeemed) return null
  if (voucher.revoked) return "reissue"
  return "revoke"
}

export default function VouchersPage(){
    const { theme } = useTheme()
    const { data, loading, error } = useSelector((state: RootState) => state.vouchers)
    const [filter, setFilter] = useState<VoucherFilters>(structuredClone(initialFilter))
    const [sort, setSort] = useState<"ID-ASC" | "ID-DESC" | "DATE-ASC" | "DATE-DESC">("ID-ASC")
    const [open, setOpen] = useState(false)
    const openRowRef = useRef<SwipeRow<any> | null>(null)

    const styles = getStyles(theme)

    const handleFilterClicked = () => {
        setOpen(true)
    }

    const handleSort = (type: string) => {
        if (type === "ID"){
            if (sort === "ID-ASC"){//sort by ID in descending order
                setSort("ID-DESC")
            } else {//sort ID in ascending order
                setSort("ID-ASC")
            }
        } else {
            if (sort === "DATE-DESC"){//sort by date in ascending order (oldest first)
                setSort("DATE-ASC")

            } else {//sort by data in descending order
                setSort("DATE-DESC")

            }
        }
    }

    const displayVouchers = useMemo(() => {
        if (!data) return []
        let vouchers = [...data]

        if (sort === "ID-ASC"){
            vouchers.sort((a, b) => (a.voucherid < b.voucherid ? -1 : 1))
        } else if (sort === "ID-DESC"){
            vouchers.sort((a, b) => (a.voucherid > b.voucherid ? -1 : 1))
        } else if (sort === "DATE-ASC"){
            vouchers.sort((a,b) => {
               const rawDateA = a.redeemedat ?? a.revokedat
                const rawDateB = b.redeemedat ?? b.revokedat

                const dateA = rawDateA ? new Date(rawDateA) : null
                const dateB = rawDateB ? new Date(rawDateB) : null

                if (!dateA && !dateB) return 0
                if (!dateA) return 1   
                if (!dateB) return -1 

                return dateA.getTime() - dateB.getTime()
            })
        } else {
            vouchers.sort((a,b) => {
               const rawDateA = a.redeemedat ?? a.revokedat
                const rawDateB = b.redeemedat ?? b.revokedat

                const dateA = rawDateA ? new Date(rawDateA) : null
                const dateB = rawDateB ? new Date(rawDateB) : null

                if (!dateA && !dateB) return 0
                if (!dateA) return 1   
                if (!dateB) return -1 

                return dateB.getTime() - dateA.getTime()
            })
        }

        return filterVouchers(vouchers, filter)
    }, [data, sort, filter])


    return (
        <SafeAreaPage>
            {open && <FilterDialog open={open} setOpen={setOpen} filter={filter} setFilter={setFilter}/>}
            <Header text="Vouchers">
                <Pressable onPress={handleFilterClicked}><SlidersHorizontal color={theme.text_primary}/></Pressable>
            </Header>
            <Card style={{display: "flex", flexDirection: "row", marginBottom: 10, paddingVertical: 10, paddingHorizontal: 0, width: "auto"}}>
                <View style={styles.stat}>
                    <Text style={{color: theme.text_primary, fontSize: 12}} allowFontScaling={false}>Total</Text>
                    <Text style={{color: theme.text_primary, fontWeight: "bold", fontSize: 16}} allowFontScaling={false}>{displayVouchers.length}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={{color: theme.text_primary, fontSize: 12}} allowFontScaling={false}>Redeemed</Text>
                    <Text style={{color: theme.text_primary, fontWeight: "bold", fontSize: 16}} allowFontScaling={false}>{displayVouchers.filter((v) => v.redeemed).length}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={{color: theme.text_primary, fontSize: 12}} allowFontScaling={false}>Not Redeemed</Text>
                    <Text style={{color: theme.text_primary, fontWeight: "bold", fontSize: 16}} allowFontScaling={false}>{displayVouchers.filter((v) => !v.redeemed && !v.revoked).length}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={{color: theme.text_primary, fontSize: 12}} allowFontScaling={false}>Revoked</Text>
                    <Text style={{color: theme.text_primary, fontWeight: "bold", fontSize: 16}} allowFontScaling={false}>{displayVouchers.filter((v) => v.revoked).length}</Text>
                </View>
            </Card>
            <Input onChangeText={(s) => {
                    setFilter(filter => ({
                        ...filter,
                        id: s
                    }))
                }
                }
                style={styles.input}
                value={filter.id}
                placeholder="Search by Voucher ID"
                
            >
                <Search color={theme.text_muted}/>
            </Input>
            <View style={styles.tableHead}>
                <Pressable style={{flex: 0.4, flexDirection: "row", justifyContent: "flex-start"}} onPress={() => handleSort("ID")}>
                    <Text style={{color: theme.text_primary, fontSize: 18, fontWeight: 500}} allowFontScaling={false}>Voucher ID</Text>
                    <ArrowDownUp color={theme.text_primary} style={{marginLeft: 6}}/>
                </Pressable>
                <Text style={{color: theme.text_primary, flex: 0.3, textAlign: "center", fontSize: 18, fontWeight: 500}} allowFontScaling={false}>Status</Text>
                <Pressable style={{flex: 0.3, flexDirection: "row", justifyContent: "flex-end"}} onPress={() => handleSort("DATE")}>
                    <Text style={{color: theme.text_primary, fontSize: 18, fontWeight: 500}} allowFontScaling={false}>Date</Text>
                    <ArrowDownUp color={theme.text_primary} style={{marginLeft: 6}}/>
                </Pressable>
            </View>
            <SwipeListView
                data={displayVouchers}
                renderItem={({item}) => <VoucherRow v={item} openRowRef={openRowRef}/>}
                keyExtractor={item => item.voucherid}
                style={{marginBottom: 60}}
                onScrollBeginDrag={() => {
                    openRowRef.current?.closeRow()
                    openRowRef.current = null
                }}
            />
        </SafeAreaPage>
    )
}

type VoucherRowProps = {
    v: Voucher
    openRowRef: React.MutableRefObject<SwipeRow<any> | null>
    
}

function VoucherRow({v, openRowRef}: VoucherRowProps){
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const rowRef = useRef<SwipeRow<any>>(null)

    const handleRowOpen = () => {
        if (
            openRowRef.current &&
            openRowRef.current !== rowRef.current
        ) {
            openRowRef.current.closeRow()
        }

        openRowRef.current = rowRef.current
    }

    
    const SwipeRowAny = SwipeRow as any

    return (
        <SwipeRowAny
            disableRightSwipe
            disableLeftSwipe={v.redeemed}
            closeOnRowPress={true}
            rightOpenValue={-90}
            ref={rowRef}
            onRowOpen={handleRowOpen}
            onRowClose={() => {
                if (openRowRef.current === rowRef.current) {
                    openRowRef.current = null
                }
            }}
        >
            <View key="actions"><SwipeAction v={v} rowRef={rowRef}/></View>
            <View key="row" style={styles.tableRow}>
                <View style={{flex: 0.5}}>
                    <Text style={{color: theme.text_primary, fontSize: 18}} allowFontScaling={false}>{v.voucherid}</Text>
                    <Text style={{color: theme.text_primary, fontSize: 12}} allowFontScaling={false}>{v.batch}</Text>
                </View>
                <View style={{flex: 0.2, alignSelf: "center",}}>{v.redeemed ? <CircleCheck color="#44ef63"/> : (v.revoked ? <CircleX color="#EF4444"/> : <CircleMinus color={theme.text_muted}/>)}</View>
                <Text style={{color: theme.text_primary, flex: 0.3, textAlign: "center", fontSize: 14}} allowFontScaling={false}>{v.redeemed ? convertDate(v.redeemedat) : (v.revoked ? convertDate(v.revokedat) : null)}</Text>
            </View>
        </SwipeRowAny>
    )
}

type SwipeActionProps = {
    v: Voucher
    rowRef: React.RefObject<SwipeRow<any> | null>
}

function SwipeAction({v, rowRef}: SwipeActionProps){
    const dispatch = useDispatch()
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const action = getVoucherAction(v)
    if (!action) return null

    const revokable = action === "revoke"

    const handlePress = () => {
        if (revokable){
            Alert.alert(
                "Revoke Voucher?", 
                "Voucher will no longer be redeemable.", 
                [{ text: "Cancel", style: "cancel" }, { text: "Revoke", 
                    onPress: () => {
                        revokeVoucher(v.voucherid, dispatch)
                        rowRef.current?.closeRow()
                    } }]
            )
        } else {
            Alert.alert(
                "Reissue Voucher?", 
                "Voucher will become redeemable.", 
                [{ text: "Cancel", style: "cancel" }, { text: "Reissue", 
                    onPress: () => {
                        reissueVoucher(v.voucherid, dispatch)
                        rowRef.current?.closeRow()
                    } }]
            )
        }
    }

    return (
        <Pressable
            onPress={handlePress}
            style={[styles.swipe, {backgroundColor: revokable ? "#EF4444" : theme.accent_primary}]}
        >
            <Text style={{color: theme.text_accent, fontSize: 14}} allowFontScaling={false}>{revokable ? "Revoke" : "Reissue"}</Text>
        </Pressable>
    )
}


function getStyles(theme: Theme){
    return StyleSheet.create({
        tableHead: {
            flexDirection: "row",
            width: "100%",
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderColor: theme.accent_primary,
            justifyContent: "space-between",
            height: 40,
            alignItems: "center"
        },
        tableRow: {
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: theme.accent_primary,
            height: 40,
            backgroundColor: theme.background_primary
        },
        input: {
            marginBottom: 10
        },
        swipe: {
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
            width: 90,
            position: "absolute",
            right: 0
        },
        stat: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 0.25
        }
    })
}