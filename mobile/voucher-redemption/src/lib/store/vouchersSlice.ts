import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { supabase } from "../supabase/supabase";


export interface Voucher {
    voucherid: string
    registered: boolean
    redeemed: boolean
    redeemedat: Date | null
    batch: string
}

export interface VouchersState {
    data: Voucher[]
    loading: boolean
    error: string | null
}

const initialState: VouchersState = {
    data: [],
    loading: false,
    error: null
}

export const fetchVouchers = createAsyncThunk('vouchers/fetchVouchers', 
    async () => {
        const { data, error } = await supabase
            .from('vouchers')
            .select()

        if (error) return null

        return data as Voucher[]

    }
)

const vouchersSlice = createSlice({
    name: "vouchers",
    initialState,
    reducers: {
        updateVoucherRedeemed: (state, action) => {
            console.log("Updating voucher:", action.payload)
            if (!state.data) return

            const voucher = state.data.find(v => v.voucherid === action.payload.id)

            if (voucher) {
                voucher.redeemed = true
                voucher.redeemedat = action.payload.redeemedat
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVouchers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchVouchers.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload ?? []
                console.log(state.data.length)
            })
            .addCase(fetchVouchers.rejected, (state, action) => {
                state.loading = true
                state.error = action.error.message || "Failed to fetch Vouchers"
            })
    }
})

export default vouchersSlice.reducer
export const { updateVoucherRedeemed } = vouchersSlice.actions