// Model
import Users from '../models/user_model.mjs'

// register
export const register = async ( req, res, next ) => {

    try {

        // 1. save a single document
        const user = new Users(req.data)
        const result = await user.save()

        // 2. print the results
        if (result) {
            return res.status(201).json({
                message : 'succed',
                 data : {
                    name : result.name,
                    username : result.username,
                    email : result.email,
                    gender: result.gender,
                    birhtday: result.birthday,
                    avatar : result.avatar
                 }
            })
        }


    } catch (err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            message : 'Error system !'
         })
    }

}