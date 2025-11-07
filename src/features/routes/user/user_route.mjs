import  express  from 'express'
const router = express()

// Controllers
import { register } from '../../controllers/user_controller.mjs'

// Manual Middleware

// Register
router.get('/register', register)

export default router