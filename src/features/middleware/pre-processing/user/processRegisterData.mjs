// npm package manager
import { body, validationResult } from 'express-validator'
import bcrypt from "bcrypt"

// model
import User from '../../../models/userModel.mjs'

export const processRegisterData = async ( req, res, next ) => {

    try {

        if ( !req.body ) {
            return res.status(400).json({
                success : false,
                message : 'no data provided!'
            })
        }

        // 1. fetch all data from request body
        const { name, username, confirm_password, email, password, gender, birthday } = req.body

        // 2.1 check the sent data and validation rules
        await Promise.all([
                body('name').notEmpty().withMessage('name is required!').run(req),
                body('username').notEmpty().withMessage('username is required!').run(req),
                body('email').notEmpty().withMessage('email is required!').run(req),
                body('password').notEmpty().withMessage('password is required!').run(req),
                body('confirm_password').notEmpty().withMessage('birthday is required!').run(req),
                body('birthday').notEmpty().withMessage('birthday is required!').run(req)
            ])

        // 2.2 if the data does not meet the requirements, the uploaded file will be deleted
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

        // 3. check if the data is available in database
       const userExists = await User.findOne({$or: [{ email }, { username }]})
       if (userExists) {
            const conflictField = userExists.email === email ? 'email' : 'username';
            return res.status(409).json({ 
                success: false,
                message: `${conflictField} already registered!` 
            })
        }

        // 3.1 check confirmation password
        if ( password !== confirm_password) {
            return res.status(202).json({ 
                success: false,
                message : 'the password you entered is incorrect!'
            })
        }

        // 4. hash password
        const saltRoundes = 12
        const hashedPassword = await bcrypt.hash(password, saltRoundes)

        // 5. data has been verified
        const processRegisterData = { 
            name : name.trim(), 
            username: username.trim(), 
            email: email.trim(), 
            password : hashedPassword, 
            gender : gender.trim(), 
            birthday: birthday.trim(), 
            createdAt : new Date(), 
            avatar : 'default.jpg',
            role : 'guest'
        }

        // 6. pass the verified data to the next middleware
        req.processRegisterData = processRegisterData
        next()

    } catch (err) {
        // handle errors
        console.error(err)
        return res.status(500).json({
            success : false,
            message : 'error in registering process!',
        })
    }

}