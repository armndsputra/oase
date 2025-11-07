import  express  from 'express'
const router = express()

// Controllers
import { 
  fetchAll, 
  saveToDatabase, 
  deleteToDatabase, 
  updateToDatabase, 
  fetchDataByID 
} from '../../controllers/postal_controller.mjs'

// Local helpers
import { upload } from './helpers/_set_multer.mjs';

// Local middleware
import { beforeToDatabase } from './middleware/pre-processing/beforeToDatabase.mjs'
import { beforeToUpdate } from  './middleware/pre-processing/beforeToUpdate.mjs'
import { beforeToDelete } from './middleware/pre-processing/beforeToDelete.mjs'
import { beforeFetchDataByID } from './middleware/pre-processing/beforeToFetchDataByID.mjs'
import { beforeFetchDataByKeywords} from './middleware/pre-processing/beforeToFetchDataByKeywords.mjs'

// fetch all
router.get('/', fetchAll)

// save
router.post('/',upload.array('thumbnail'), beforeToDatabase, saveToDatabase)

// delete
router.delete('/:id', beforeToDelete, deleteToDatabase)

// update
router.patch('/:id', upload.array('thumbnail'), beforeToUpdate, updateToDatabase)

// fetch data by id
router.get('/:id', beforeFetchDataByID, fetchDataByID)

// fetch data by keywords
router.post('/keywords', beforeFetchDataByKeywords)

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