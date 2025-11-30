import  { Router }  from 'express'
const router = Router()

// controllers
import { 
  fetchAllContent, 
  saveContent, 
  deleteContent, 
  updateContent, 
  fetchContentByID,
  fetchContentByKeywords
} from '../controllers/postalController.mjs'

// route helpers
import { upload } from './middleware/postal/helpers/_set_multer.mjs'

// route middleware
import {
  processContentData,
  processUpdateContentData,
  processFetchAllContentData,
  processFetchContentDataByID,
  processDeleteContentData,
  processFetchContentDataByKeywords
} from './middleware/index.mjs'

// service
import { mainAccessUser } from '../service/mainAccessUser.mjs'

// fetch all
router.get('/', processFetchAllContentData, fetchAllContent)

// save
router.post('/',mainAccessUser, upload.array('thumbnail'), processContentData, saveContent)

// delete
router.delete('/:id', mainAccessUser, processDeleteContentData, deleteContent)

// update
router.patch('/:id',mainAccessUser, upload.array('thumbnail'), processUpdateContentData, updateContent)

// fetch data by id
router.get('/:id', processFetchContentDataByID, fetchContentByID)

// fetch data by keywords
router.post('/keywords', processFetchContentDataByKeywords, fetchContentByKeywords)

// error handling
router.use((err, req, res, next) => {

    // // Error Handling file size
    if (err instanceof multer.MulterError) {

      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          status: false,
          message: 'file is too large!. Max 1MB!'
        });
      }
      return res.status(400).json({
      success: false,
      message: `upload failure : ${err.message}`
    });
  }

    next();
});

export default router