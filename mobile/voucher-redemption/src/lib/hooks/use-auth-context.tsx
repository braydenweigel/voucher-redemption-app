import { Session, User } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

export type AuthData = {
  user: User | null
  session: Session | null
  isLoading: boolean
  isLoggedIn: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getSession: () => Promise<void>
}

export const initialAuthState = {
  user: null,
  session: null,
  isLoading: true,
  isLoggedIn: false,
  signIn: async () => {},
  signOut: async () => {},
  getSession: async () => {}
} as AuthData

export const AuthContext = createContext<AuthData>(initialAuthState)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}