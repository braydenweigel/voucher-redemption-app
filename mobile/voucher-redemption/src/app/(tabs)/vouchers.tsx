import SafeAreaPage from "@/lib/components/lib/page";
import { useTheme } from "@/lib/hooks/use-theme-context";
import { RootState } from "@/lib/store/store";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

function convertDate(date: Date | null){
    if (!date) return ""

   return new Date(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit"
  })
}

export default function VouchersPage(){
    const { theme } = useTheme()
    const { data, loading, error } = useSelector((state: RootState) => state.vouchers)

    return (
        <SafeAreaPage>
            <Text style={{color: theme.text_primary}}>Voucher ID    Redeemed     Redeemed At</Text>
            <FlatList
                data={data}
                renderItem={({item}) => <Text style={{color: theme.text_primary}}>{item.voucherid}             {item.redeemed ? "TRUE" : "FALSE"}       {item.redeemed ? convertDate(item.redeemedat) : null}</Text>}
                keyExtractor={item => item.voucherid}
            />
        </SafeAreaPage>
    )
}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingVertical: '10%',
        
    }
})