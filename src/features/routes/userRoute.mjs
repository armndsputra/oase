import  { Router }  from 'express'
const router = Router()

// controllers
import { fetchAllUser, deleteUser, updateUser } from '../controllers/userController.mjs'

// middleware
import { processDeleteUserData, processFetchAllUserData, processUpdateUserData } from './middleware/index.mjs'

// service
import { deleteAccessUser } from '../service/deleteAccessUser.mjs'
import { fetchAccessUser } from '../service/fetchAccessUser.mjs'
import { updateAccessUser } from '../service/updateAccessUser.mjs'

// route helpers
import { upload } from './middleware/user/helpers/_set_multer.mjs'


// fetch all user
router.get('/', fetchAccessUser, processFetchAllUserData, fetchAllUser)

// update user
router.patch('/:id',updateAccessUser, upload.array('avatar'), processUpdateUserData, updateUser)

// delete user
router.delete('/:id', deleteAccessUser, processDeleteUserData, deleteUser)

export default router