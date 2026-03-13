import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { supabase } from "../supabase/supabase";

export interface Profile {
    profileid: string
    email: string
    first_name: string
    last_name: string
}

interface ProfileState {
    data: Profile | null
    loading: boolean
    error: string | null
}

const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null
}

export const fetchProfile = createAsyncThunk('profile/fetchProfile', 
    async () => {
        const { data: { user }} = await supabase.auth.getUser()

        if (!user) return null

        const { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('profileid', user.id)
            .limit(1)
            .single()

        if (error) return null

        return data as Profile

    }
)

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfileName: (state, action) => {
            if (state.data) {
                state.data.first_name = action.payload.first_name
                state.data.last_name = action.payload.last_name
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = true
                state.error = action.error.message || "Failed to fetch Profile"
            })
    }
})

export default profileSlice.reducer
export const { updateProfileName } = profileSlice.actions