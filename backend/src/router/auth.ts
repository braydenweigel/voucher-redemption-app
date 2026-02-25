import { Router } from 'express'
import express from 'express'
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import { authMiddleware } from '../lib/middleware/auth.js'

dotenv.config()

const e = express

const authRouter = Router()

authRouter.post('/login', async function (req, res, next){
    const email: string = req.body.email
    const password: string = req.body.password

    if (!email || !password){
        res.status(400).send({ error: "Invalid Request" })
    }

    const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_PUBLISHABLE_KEY || "", {
        auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }
    })

    if (!supabase){
        res.status(500).send({ error: "Could not connect to Supabase" })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error || !data.session){
        res.status(401).send({ error: "Invalid Credentials"} )
    }

    res.status(200).send(data)
})



authRouter.post('/refresh', async function (req, res, next){
    const refresh_token: string = req.body.refresh_token

    if (!refresh_token){
        res.status(400).send({ error: "Invalid Request" })
    }

    const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_PUBLISHABLE_KEY || "", {
        auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }
    })

    const { data, error } = await supabase.auth.refreshSession({ refresh_token })

    if (error || !data.session){
        res.status(401).send({ error: "Invalid Credentials"} )
    }

    res.status(200).send(data)
})



authRouter.post('/logout', authMiddleware, async function (req, res, next){
    if (!req.supabase){
        return res.status(500).send({ error: "Could not connect to Supabase" })
    }
    
    const { error } = await req.supabase.auth.signOut({ scope: 'local' })

    //if error, return error code and message
    if (error){
        res.status(401).send({ error: "Could not logout"})
    }

    res.status(200).send('Logout Successful')
})

export default authRouter