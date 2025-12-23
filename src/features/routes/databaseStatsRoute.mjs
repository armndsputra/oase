import  { Router }  from 'express'
const router = Router()

import { getMongoDBStats } from '../middleware/service/dbControl/mongodbStats.mjs'

import { AccessControlService } from '../middleware/service/accessControl/AccessControlService.mjs'

const accessControlService = new AccessControlService()

const admin = accessControlService.allowAccess('admin')

// database stats route
router.get('/mongodb', admin, getMongoDBStats)

// general database stats route

// router.get('/', getMongoDBStats)

export default router