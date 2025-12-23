import  { Router }  from 'express'
const router = Router()

// middleware
import { processFetchAllTrafficData } from '../middleware/pre-processing/index.mjs'

// controller
import { fetchAllTrafficLogs } from '../controllers/trafficController.mjs'

// services
import { AccessControlService } from '../middleware/service/accessControl/AccessControlService.mjs'

const accessControlService = new AccessControlService()

const admin = accessControlService.allowAccess('admin')

// register
router.get('/', admin, processFetchAllTrafficData, fetchAllTrafficLogs)

export default router