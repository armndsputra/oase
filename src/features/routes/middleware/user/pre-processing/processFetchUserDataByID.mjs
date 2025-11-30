import mongoose from "mongoose"

export const processFetchUserDataByID = async ( req, res, next ) => {

    const id = req.params.id

    try {

        // 1. check id valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message : 'incorrect ID entered!'})
        
        req.id = id
        next()

    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).send({ 
            message: 'Error system !' 
        })
    }

}