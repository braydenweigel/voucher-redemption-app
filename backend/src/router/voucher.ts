import { Router } from 'express'
import express from 'express'

const e = express

const voucherRouter = Router()

voucherRouter.get('/', async function (req, res, next){
    res.status(200).send('Get Vouchers')
})

voucherRouter.post('/', async function (req, res, next){
    res.status(200).send('Upload Vouchers')
})

voucherRouter.get('/:voucherID', async function (req, res, next){
    res.status(200).send('Get Voucher by ID')
})

voucherRouter.patch('/:voucherID', async function (req, res, next){
    res.status(200).send('Update Voucher by ID')
})


export default voucherRouter