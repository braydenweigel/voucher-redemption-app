import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import type { Request, Response, NextFunction } from "express"

dotenv.config()

export async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ error: "Missing token" })
    }

    const token = authHeader.split(" ")[1]

    const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_PUBLISHABLE_KEY || "",
        { global: { headers: { Authorization: `Bearer ${token}` }}}
    )

    if (!supabase){
        res.status(500).send({ error: "Could not connect to Supabase" })
    }

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        return res.status(401).send({ error: "Invalid Token" })
    }

    req.user = user
    req.supabase = supabase

    next()
}