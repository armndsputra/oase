import mongoose from "mongoose"
import { body, validationResult } from 'express-validator'

import User from "../../../models/userModel.mjs"

export const processUpdateUserRoleData = async ( req, res, next ) => {

    try {

        const { id } = req.params
        const { role } = req.body

        // 1. check the sent data and validation rules
        await Promise.all([
            body('role').notEmpty().withMessage('role is required!').run(req),
        ])
        // 1.1  if the data does not meet the requirements
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.error('validation errors :', errors.array())
            return res.status(422).json({
                    success: false,
                    message: 'validation failed!',
                    errors: errors.array(),
                    receivedData: req.body
            })
        }

        if (role === 'admin') {
            return res.status(403).json({ 
                success: false,
                message : 'forbidden : cannot set role to admin!'
            })
        }

         // 2. validasi user ID 
        if (!mongoose.Types.ObjectId.isValid(id)) { 
            return res.status(400).json({ 
                success: false,
                message : 'the ID you entered is incorrect!'
            })
        }


        // 3. cek user by ID
        const checkUser = await User.findById(id)
        console.log(checkUser)
        if (!checkUser) {
            return  res.status(404).json({
                success: false,
                message : 'user not found!',
            })
        } else if (checkUser.role === 'admin') {
            return  res.status(403).json({
                success: false,
                message : 'forbidden : cannot change role of admin user!',
            })
        }

        // 4. data has been verified as valid, continue to the next middleware
        req.processUpdateUserRoleData = { role, id }
        next() 

    } catch (err) {
         // handle errors
        console.log(err)
        res.status(500).json({
            success: false,
            message : 'error processing update user role data!',
        })
    }

}