import  { Router }  from 'express'
const router = Router()

// controllers
import { register } from '../controllers/userController.mjs'

// middleware
import { processRegisterData } from '../middleware/pre-processing/index.mjs'

// register
router.post('/', processRegisterData, register)

export default router