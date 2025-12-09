import  { Router }  from 'express'
const router = Router()
import multer from 'multer'

// controllers
import { fetchAllUser, deleteUser, updateUser, fetchUserByID, updateUserRole } from '../controllers/userController.mjs'

// middleware
import { 
    processDeleteUserData,
    processFetchAllUserData, 
    processUpdateUserData, 
    processFetchUserDataByID,
    processUpdateUserRoleData
} from '../middleware/pre-processing/index.mjs'

// service
import { deleteAccessUser } from '../middleware/service/deleteAccessUser.mjs'
import { fetchAccessUser } from '../middleware/service/fetchAccessUser.mjs'
import { updateAccessUser } from '../middleware/service/updateAccessUser.mjs'
import { mainAccessAdmin } from '../middleware/service/mainAccessAdmin.mjs'

// route helpers
// import { upload } from './middleware/user/helpers/_set_multer.mjs'



// configure storage for multer
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/users/'); // specify the upload directory
      },
      filename: (req, file, cb) => {
        cb(null, new Date().toISOString()+'-'+Math.round(Math.random() * 1E9)+'.'+file.mimetype.split('/')[1]); // rename the file
      }
  })
// configure filter
const fileFilter = (req, file, cb) => {
    const mimetype = file.mimetype
    if (mimetype === "image/jpeg" || mimetype === "image/png" || mimetype === "image/jpg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
      
  }

const upload = multer({ storage, fileFilter, limits: {
    fileSize: 1024 * 1024, // 1MB limit
  }})


// fetch all user
router.get('/', fetchAccessUser, processFetchAllUserData, fetchAllUser)

// fetch user by ID
router.get('/:id', mainAccessAdmin, processFetchUserDataByID, fetchUserByID)

// update user
router.patch('/:id',updateAccessUser, upload.array('avatar'), processUpdateUserData, updateUser)

// delete user
router.delete('/:id', deleteAccessUser, processDeleteUserData, deleteUser)

// update user role
router.patch('/role/:id', mainAccessAdmin, processUpdateUserRoleData, updateUserRole)

export default router