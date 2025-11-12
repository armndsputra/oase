import  express  from 'express'
const router = express()

// controllers
import { register } from '../../controllers/user_controller.mjs'

// local middleware
import { bridgeToUser } from './middleware/pre-processing/brigdeToUser.mjs'

// Register
router.post('/register', bridgeToUser, register)

export default router