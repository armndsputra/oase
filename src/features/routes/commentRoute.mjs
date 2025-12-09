import  { Router }  from 'express'
const router = Router()

import { proccessCommentData } from './middleware/index.mjs'

// controller
import { commenter } from '../controllers/commenterController.mjs'

import { mainAccessGuest } from '../service/mainAccessGuest.mjs'

// comment route
router.post('/:id', mainAccessGuest, proccessCommentData, commenter)


export default router