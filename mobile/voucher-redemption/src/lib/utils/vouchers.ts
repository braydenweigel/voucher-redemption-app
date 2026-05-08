import { Alert } from "react-native"
import { supabase } from "../supabase/supabase"
import { useDispatch } from "react-redux"
import { updateVoucherRedeemed, updateVoucherReissued, updateVoucherRevoked } from "../store/vouchersSlice"
import { AppDispatch } from "../store/store"

export async function verifyVoucher(id: string, dispatch: AppDispatch){
    const { data, error } = await supabase
            .from('vouchers')
            .select()
            .eq("voucherid", id.toUpperCase())
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

    if (data.revoked){
        Alert.alert("Voucher has been revoked!")
        return
    }

    Alert.alert(
        `Redeem Voucher ${data.voucherid}?`, 
        `${data.batch}`, 
        [
            { text: "Cancel", style: "cancel" },
            { text: "Redeem", onPress: () => redeemVoucher(data.voucherid, dispatch) }
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

    Alert.alert(`Voucher ${data.voucherid} Redeemed!`, `${data.batch}`)     
}

export async function revokeVoucher(id: string, dispatch: AppDispatch){    
    const { data, error: updateError } = await supabase
        .from('vouchers')
        .update({ revoked: true })
        .eq('voucherid', id)
        .select()
        .single()

    if (updateError){
        Alert.alert("Error revoking voucher!")
        return
    }

    //update voucher in Redux here
    dispatch(updateVoucherRevoked({id: data.voucherid, revokedat: data.revokedat}))

    Alert.alert("Voucher Revoked!")     
}

export async function reissueVoucher(id: string, dispatch: AppDispatch){    
    const { data, error: updateError } = await supabase
        .from('vouchers')
        .update({ revoked: false })
        .eq('voucherid', id)
        .select()
        .single()

    if (updateError){
        Alert.alert("Error reissuing voucher!")
        return
    }

    //update voucher in Redux here
    dispatch(updateVoucherReissued({id: data.voucherid}))

    Alert.alert("Voucher Reissued!")     
}