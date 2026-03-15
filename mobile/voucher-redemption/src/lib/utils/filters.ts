import { Voucher } from "../store/vouchersSlice";

export interface VoucherFilters {
    id: string
    redeemed: boolean | undefined
    redeemedAt: {
        from: Date | undefined
        to: Date | undefined
    }
    batch: Set<string>
}

export const initialFilter: VoucherFilters = {
    id: "",
    redeemed: undefined,
    redeemedAt: {
        from: undefined,
        to: undefined
    },
    batch: new Set<string>()
}

export const Batches: string[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

export function filterVouchers(vouchers: Voucher[], filters: VoucherFilters){
    return vouchers.filter(voucher => {
        //Filter by Voucher ID
        if (filters.id && filters.id.length > 0){
            const filterString = filters.id.trim().toLowerCase()
            const voucherID = voucher.voucherid.toLowerCase()
            if(!voucherID.includes(filterString)) return false
        }



        return true //if voucher passes all filters
    })
}