import mongoose from "mongoose";

import User from '../../../../models/userModel.mjs'

// helper
import { __file_remove } from "../../../../../helpers/__file_remove.mjs"

export const processDeleteUserData = async ( req, res, next ) => {

    try {

        const { role } = req.decode
        const id = req.params.id

        // 1. check id valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message : 'the ID you entered is incorrect!'})

        // 2. Check if data exists
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ message : 'ID data you are looking for was not found!'})

        // ACCESS DELETE USER ( AuthorizationAuthorization )
        if (user.role === role) {
            return res.status(403).json({ message : 'forbidden : user is prohibited from being deleted!'})
        }

        // 3. remove old avatar path / file
        await __file_remove([user.avatar]).then(result => {
                        console.log('Operation result:', result)
        }).catch(error => {
            console.error('Operation failed:', error)
        })
        
        // 4. data has been verified
        req.data = user
        next()


    } catch (err) {
         // handle errors
        console.log(err)
        res.status(500).json({
            message : 'error system !',
        })
    }

}