import { PropsWithChildren, useEffect, useState } from "react"
import { AuthContext, initialAuthState, useAuth } from "../hooks/use-auth-context"
import { Session, User } from "@supabase/supabase-js"
import { supabase } from "../supabase/supabase"
import { Alert } from "react-native"


export function AuthProvider({ children }: PropsWithChildren){
    const [state, setState] = useState(initialAuthState)

    return (
        <AuthContext.Provider
            value={
                {
                    ...state,
                    signIn: async (email, password) => {
                        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

                        if (error){
                            Alert.alert(error.message)
                            return
                        }

                        setState({
                            ...state,
                            session: data.session,
                            user: data.user,
                            isLoading: false,
                            isLoggedIn: true
                        })
                    },
                    signOut: async () => {
                        await supabase.auth.signOut()

                        setState({
                            ...state,
                            session: null,
                            user: null,
                            isLoading: false,
                            isLoggedIn: false
                        })
                    },
                    getSession: async () => {
                        const { data, error } = await supabase.auth.getSession()

                        if (error){
                            Alert.alert(error.message)
                            return
                        }

                        setState({
                            ...state,
                            session: data.session,
                            user: data.session?.user ?? null,
                            isLoading: false,
                            isLoggedIn: data.session?.user != null
                        })
                    }
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}