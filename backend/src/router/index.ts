import { Router } from 'express'

import authRouter from './auth.js'
import voucherRouter from './voucher.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/voucher', voucherRouter)

export default router