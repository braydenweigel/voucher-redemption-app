import { Alert } from "react-native"
import { supabase } from "../supabase/supabase"

export async function verifyVoucher(id: string){
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

export async function redeemVoucher(id: string){
    const { error: updateError } = await supabase
        .from('vouchers')
        .update({ redeemed: true })
        .eq('voucherid', id)

    if (updateError){
        Alert.alert("Error redeeming voucher!")
        return
    }

    Alert.alert("Voucher Redeemed!")     
}