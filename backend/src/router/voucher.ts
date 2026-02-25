import { Router } from 'express'
import express from 'express'
import { authMiddleware } from '../lib/middleware/auth.js'
import type { Request, Response, NextFunction } from "express"

const e = express

const voucherRouter = Router()

voucherRouter.get('/', authMiddleware, async function (req: Request, res: Response, next: NextFunction){
    if (!req.supabase){
        return res.status(500).send({ error: "Could not connect to Supabase" })
    }
    //check params
    const batch = req.query.batch
    const redeemed = req.query.redeemed

    let query = req.supabase.from('vouchers').select('*')

    if (batch){
        query.eq('batch', batch)
    }

    if (redeemed && (redeemed == 'true' || redeemed == 'false')){
        query.eq('redeemed', (redeemed == 'true' ? true : false))
    }

    const { data, error } = await query

    if (error){
        res.status(400).send({ error: 'Error fetching data'})
    }

    res.status(200).send(data)
})



// voucherRouter.post('/', async function (req, res, next){
//     if (!req.supabase){
//         return res.status(500).send({ error: "Could not connect to Supabase" })
//     }

//     res.status(200).send('Upload Vouchers')
// })



voucherRouter.get('/:voucherID', authMiddleware, async function (req, res, next){
    if (!req.supabase){
        return res.status(500).send({ error: "Could not connect to Supabase" })
    }

    const id = req.params.voucherID

    const { data, error } = await req.supabase.from('vouchers').select('*').eq('voucherid', id).maybeSingle()

    if (error){
        res.status(400).send({ error: 'Error fetching data'})
    }

    if (!data){
        res.status(404).send({ error: 'Voucher not found'})
    }

    res.status(200).send(data)
})



voucherRouter.patch('/:voucherID', authMiddleware, async function (req, res, next){
    if (!req.supabase){
        return res.status(500).send({ error: "Could not connect to Supabase" })
    }

    if (!req.body){
        res.status(400).send({ error: "Invalid Request" })
    }

    const id = req.params.voucherID

    const { data, error } = await req.supabase.from('vouchers').update(req.body).eq('voucherid', id).select()

    if (error){
        res.status(400).send({ error: 'Error updating data'})
    }

    if (!data){
        res.status(404).send({ error: 'Voucher not found'})
    }

    res.status(200).send(data)
})


export default voucherRouter