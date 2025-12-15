import  { Router }  from 'express'
const router = Router()
import jwt from 'jsonwebtoken'

import { saveTrafficLog } from '../middleware/service/trafficLog/trafficManagement.mjs'

class trafficVisitor {

    constructor(maxSize = 12) {
        this.maxSize = maxSize
        this.data = []
        this.process = false
    }

    async add(visitor) {
        if (this.process) {
            // wait until the process is released
            console.log('waiting for lock to be released...')
            return new Promise((resolve) => {
                const check = setInterval(() => {
                    if (!this.process) {
                        clearInterval(check)
                        this.add(visitor).then(resolve)
                    }
                }, 10)
            })
        }

        this.process = true

        try {
            
            this.data.push(visitor)
            if (this.data.length > this.maxSize) {
                this.data = this.data.slice(-this.maxSize / 2)
                
            }

        } finally {

            this.process = false

        }
        
    }

    getAll() {
        return this.data
    }

    clear() {
        return this.data = []
    }

    getSize() {
        return this.data.length
    }

    getNewest() {
        return this.data[this.data.length - 1]
    }

}

const trafficData = new trafficVisitor(10)

router.use(async(req, res, next) => {

    try {

        const token = req.header('Authorization')?.replace('Bearer ', '')

        let userId = []
        let username = []

        jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
            if (decoded) {
                userId = decoded.id
                username = decoded.username
            } else {
                userId = 'unknown'
                username = 'unknown'
            }
        })

        const visitorData = {
            ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            userID : userId,
            username : username,
            userAgent: req.headers['user-agent'],
            method: req.method,
            url: req.url,
            timestamp: new Date().toISOString(),
            referrer: req.headers['referer'] || req.headers['referrer'],
            language: req.headers['accept-language']
        }

        trafficData.add(visitorData)

        // console.log('traffic data : ', trafficData.getAll())
        // console.log('traffic data size : ', trafficData.getSize())
        // console.log('newest visitor : ', trafficData.getNewest())

        saveTrafficLog(trafficData.getNewest())

        next()

    } catch(err) {
        console.error('Error in traffic log middleware:', err)
        next()
    }
    
})

export default router