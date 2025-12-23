import  { Router }  from 'express'
const router = Router()

// middleware pre-processing
import {
  processSaveGalleryData
} from '../middleware/pre-processing/index.mjs'

// add file upload middleware
import { UploadPicture } from '../../helpers/UploadImages.mjs'
const uploadPicture = new UploadPicture()
const uploadMiddleware = uploadPicture.addFileUploadMiddleware('public/gallery')
const uploadMultiple = uploadMiddleware.array('gallery')

// register
router.post('/', uploadMultiple, processSaveGalleryData)

export default router