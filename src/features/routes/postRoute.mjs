import  { Router }  from 'express'
const router = Router()

// controllers
import { 
  fetchAllContent, 
  saveContent, 
  deleteContent, 
  updateContent, 
  fetchContentByID,
  fetchContentByKeywords,
  fetchAllContentByUserId
} from '../controllers/postController.mjs'

// helpers
// add file upload middleware
import { UploadPicture } from '../../helpers/UploadImages.mjs'
const uploadPicture = new UploadPicture()
const uploadMiddleware = uploadPicture.addFileUploadMiddleware('public/posts/')
const uploadMultiple = uploadMiddleware.array('thumbnail')

// middleware pre-processing
import {
  processContentData,
  processUpdateContentData,
  processFetchAllContentData,
  processFetchContentDataByID,
  processDeleteContentData,
  processFetchContentDataByKeywords,
  processFetchAllContentByUserId
} from '../middleware/pre-processing/index.mjs'


// services
import { AccessControlService } from '../middleware/service/accessControl/AccessControlService.mjs'

const accessControlService = new AccessControlService()

const user = accessControlService.allowAccess('user')

// fetch all
router.get('/', processFetchAllContentData, fetchAllContent)

// fetch all post by user ID
router.get('/user', user, processFetchAllContentByUserId, fetchAllContentByUserId)

// save
router.post('/',user, uploadMultiple, processContentData, saveContent)

// delete
router.delete('/:id', user, processDeleteContentData, deleteContent)

// update
router.patch('/:id',user, uploadMultiple, processUpdateContentData, updateContent)

// fetch data by id
router.get('/:id', processFetchContentDataByID, fetchContentByID)

// fetch data by keywords
router.post('/keywords', processFetchContentDataByKeywords, fetchContentByKeywords)

export default router