import  { Router }  from 'express'
const router = Router()

// controllers
import { 
  fetchAllUser,
  deleteUser, 
  updateUser, 
  fetchUserByID, 
  updateUserRole 
} from '../controllers/userController.mjs'

// middleware
import { 
    processDeleteUserData,
    processFetchAllUserData, 
    processUpdateUserData, 
    processFetchUserDataByID,
    processUpdateUserRoleData
} from '../middleware/pre-processing/index.mjs'

// services
import { AccessControlService } from '../middleware/service/accessControl/AccessControlService.mjs'

const accessControlService = new AccessControlService()

const user = accessControlService.allowAccess('user')
const admin = accessControlService.allowAccess('admin')


// helpers
// add file upload middleware
import { UploadPicture } from '../../helpers/UploadImages.mjs'
const uploadPicture = new UploadPicture()
const uploadMiddleware = uploadPicture.addFileUploadMiddleware('public/users/')
const uploadMultiple = uploadMiddleware.array('avatar')


// fetch all user
router.get('/', admin, processFetchAllUserData, fetchAllUser)

// fetch user by ID
router.get('/:id', admin, processFetchUserDataByID, fetchUserByID)

// update user
router.patch('/:id',user, uploadMultiple, processUpdateUserData, updateUser)

// delete user
router.delete('/:id', admin, processDeleteUserData, deleteUser)

// update user role
router.patch('/role/:id', admin, processUpdateUserRoleData, updateUserRole)

export default router