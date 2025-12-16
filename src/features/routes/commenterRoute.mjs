import  { Router }  from 'express'
const router = Router()

import { processCommentData,  processFetchAllCommentsByPostId } from '../middleware/pre-processing/index.mjs'

// controller
import { commenter, fetchCommenterByPostId } from '../controllers/commenterController.mjs'

import { mainAccessGuest } from '../middleware/service/mainAccessGuest.mjs'
import { mainAccessUser } from '../middleware/service/mainAccessUser.mjs'

// comment route
router.post('/:id', mainAccessGuest, processCommentData, commenter)

// fetch all commenter by post id/content id
router.get('/:id', 
    mainAccessUser, 
    processFetchAllCommentsByPostId, 
    fetchCommenterByPostId
)  


export default router