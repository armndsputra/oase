import  { Router }  from 'express'
const router = Router()

// controllers
import { register } from '../controllers/userController.mjs'

// middleware
import { verifyRegisterData } from './middleware/index.mjs'

// register
router.post('/', verifyRegisterData, register)

export default router