import  { Router }  from 'express'
const router = Router()

// middleware
import { processFetchAllTrafficData } from '../middleware/pre-processing/index.mjs'

// controller
import { fetchAllTrafficLogs } from '../controllers/trafficController.mjs'

// services
import { mainAccessAdmin } from '../middleware/service/mainAccessAdmin.mjs'

// register
router.get('/', mainAccessAdmin, processFetchAllTrafficData, fetchAllTrafficLogs)

export default router