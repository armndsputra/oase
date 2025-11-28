import  { Router }  from 'express'
const router = Router()

// middleware
import { processLoginData } from './middleware/index.mjs'

// service 
import { login } from '../service/login.mjs'
import { loginAccess } from '../service/loginAccess.mjs'

// register
router.post('/', loginAccess, processLoginData, login)

export default router