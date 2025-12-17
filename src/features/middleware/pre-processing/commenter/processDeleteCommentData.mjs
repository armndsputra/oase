import mongoose from "mongoose"

export const processDeleteCommentData = async ( req, res, next ) => {


    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ 
                    success: false,
                    message : 'incorrect ID entered!'
        })

        req.id = id
        next()


    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success : false,
            message : 'error in processing delete comment data',
        })
    }

}