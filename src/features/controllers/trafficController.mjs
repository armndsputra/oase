// Model
import Traffic from '../models/trafficLogModel.mjs'

export const fetchAllTrafficLogs = async (req, res, next) => {

    try {

        const trafficLogs =  await Traffic.find()
        .skip(req.pagination.offset)
        .limit(req.pagination.limit)
        .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            message : 'success fetch all traffic logs',
            visitors : trafficLogs.length,
            data: trafficLogs
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message : 'error fetching traffic logs',
        })
    }   
    
}