import { Voucher } from "../store/vouchersSlice";

export interface VoucherFilters {
    id: string
    redeemed: boolean
    redeemedDay: {
        from: Date
        to: Date 
    }
    unredeemed: boolean
    batch: Set<string>
    revoked: boolean
    revokedDay: {
        from: Date
        to: Date 
    }
}

export const initialFilter: VoucherFilters = {
    id: "",
    redeemed: false,
    redeemedDay: {
        from: new Date(2026, 2, 1),
        to: new Date(new Date().setHours(24, 0, 0, 0))
    },
    unredeemed: false,
    batch: new Set<string>(),
    revoked: false,
    revokedDay: {
        from: new Date(2026, 2, 1),
        to: new Date(new Date().setHours(24, 0, 0, 0))
    },
}

export const Batches: string[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

export function filterVouchers(vouchers: Voucher[], filters: VoucherFilters){
    const statuses = new Set()
    if (filters.redeemed) statuses.add("Redeemed")
    if (filters.unredeemed) statuses.add("Unredeemed")
    if (filters.revoked) statuses.add("Revoked")

    return vouchers.filter(voucher => {
        //Filter by Voucher ID
        if (filters.id && filters.id.length > 0){
            const filterString = filters.id.trim().toLowerCase()
            const voucherID = voucher.voucherid.toLowerCase()
            if(!voucherID.includes(filterString)) return false
        }

        if (filters.redeemed || filters.unredeemed || filters.revoked){//only filter by redemption status if at least one box is checked. If both are checked, no redemption status filters will be applied
            let status = ""
            if (voucher.redeemed) status = "Redeemed"
            else if (voucher.revoked) status = "Revoked"
            else status = "Unredeemed"

            if (!statuses.has(status)) return false

        }

        //Filter by Redeemed Date
        if (voucher.redeemedat){
            const redeemedDate = new Date(voucher.redeemedat)
            if (filters.redeemedDay.from > redeemedDate) return false
            if (filters.redeemedDay.to < redeemedDate) return false
        }
        


        return true //if voucher passes all filters
    })
}