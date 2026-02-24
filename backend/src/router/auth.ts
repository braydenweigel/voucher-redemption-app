import { Router } from 'express'
import express from 'express'

const e = express

const authRouter = Router()

authRouter.post('/login', async function (req, res, next){
    res.status(200).send('Login')
})

authRouter.post('/refresh', async function (req, res, next){
    res.status(200).send('Refresh')
})

authRouter.post('/logout', async function (req, res, next){
    res.status(200).send('Logout')
})

export default authRouter