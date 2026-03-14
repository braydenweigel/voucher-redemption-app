import { Alert } from "react-native"
import { supabase } from "../supabase/supabase"
import { useDispatch } from "react-redux"
import { updateVoucherRedeemed } from "../store/vouchersSlice"
import { AppDispatch } from "../store/store"

export async function verifyVoucher(id: string, dispatch: AppDispatch){
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
            { text: "Redeem", onPress: () => redeemVoucher(id, dispatch) }
        ]
    )
    
}

export async function redeemVoucher(id: string, dispatch: AppDispatch){    
    const { data, error: updateError } = await supabase
        .from('vouchers')
        .update({ redeemed: true })
        .eq('voucherid', id)
        .select()
        .single()

    if (updateError){
        Alert.alert("Error redeeming voucher!")
        return
    }

    //update voucher in Redux here
    dispatch(updateVoucherRedeemed({id: data.voucherid, redeemedat: data.redeemedat}))

    Alert.alert("Voucher Redeemed!")     
}