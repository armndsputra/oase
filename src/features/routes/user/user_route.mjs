import  express  from 'express'
const router = express()

// controllers
import { register, fetchAllUser, deleteToUser } from '../../controllers/user_controller.mjs'

// local middleware
import { bridgeToRegister } from './middleware/pre-processing/brigdeToRegister.mjs'
import { bridgeToFetchAllUser } from './middleware/pre-processing/bridgeToFetchAllUser.mjs'
import { bridgeToDeleteUser } from './middleware/pre-processing/bridgeToDeleteUser.mjs'

// fetch all user
router.get('/', bridgeToFetchAllUser, fetchAllUser)

// register
router.post('/register', bridgeToRegister, register)

// delete user
router.delete('/:id', bridgeToDeleteUser, deleteToUser)

export default router