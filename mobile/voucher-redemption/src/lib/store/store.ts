import { configureStore } from "@reduxjs/toolkit"
import profileReducer from './profileSlice'
import vouchersReducer from './vouchersSlice'

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        vouchers: vouchersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch