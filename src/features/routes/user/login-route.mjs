import  express  from 'express'
const router = express()

// middleware
import { verifyLoginData } from './middleware/index.mjs'

// middleware 
import { login } from '../../service/login.mjs'

// register
router.post('/', verifyLoginData, login)

export default router