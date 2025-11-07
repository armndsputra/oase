// Model
import Blogs from '../models/postal_model.mjs'

// find All data
export const fetchAll = async ( req, res ) => {
    
    try {

        // Find All / Get database
        const results = await Blogs.find().exec()
        results.map(e => {
            console.table(e)
        })

        // print results
        if (results) {
            return res.status(200).json({
                message : 'success',
                print : results.map(e => {
                    return {
                        id : e._id,
                        user : e.user,
                        created : e.created,
                        title : e.title,
                        thubnail : e.thumbnail,
                        content : e.content
                    }
                })
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message : 'Error system !',
        })
    }
}

// save
export const saveToDatabase = async ( req, res ) => {
    
    try {

        // insert a single document
        const blogs = new Blogs(req.data)

        // print the results
        const result = await blogs.save();
        if (result) return res.status(201).json({
            message : 'succeed',
            print : {
                user : result.user,
                title : result.title,
                created : result.created,
                thumbnail : result.thumbnail,
                content : result.content
            }
        })
       
    } catch(err) {
        // handle errors
        console.log(err)
        console.error(err.code)
        // Handle duplicate key error (e.g., unique index violation)
        if (err.code === 11000) {
            return res.status(409).json({
                message: 'Duplicate key error: A blog with this unique field already exists.'
            });
        }

        return res.status(500).json({ 
            message : 'Error system !'
         })
    }
}

// remove data
export const deleteToDatabase = async ( req, res) => {

     try {
        
        // remove
        const result = await Blogs.deleteOne({_id : req.data._id}).exec()

        // print result data
        if (result) {
            return res.status(200).json({
                message : 'deleted',
                deleted : result.deletedCount
            })
        }
        
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }
}

// edit / update data
export const updateToDatabase = async ( req, res) => {

    try {
        
        // update
        const result = await Blogs.findByIdAndUpdate(req.id, req.data, { new: true })
        
        // print the result
        return res.status(201).json({
            message : 'success',
            print : {
                user : result.user,
                title : result.title,
                created : result.created,
                thumbnail : result.thumbnail,
                content : result.content
            }
        })
      
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}

// fetch data by id
export const fetchDataByID = async ( req, res ) => {

    const id = req.id

    try {

        // Get Database
        const result = await Blogs.findById({_id : id}).exec()
        console.log(result)

        // print data
        if (result) return res.status(200).json({
            message : 'success',
            print : {
                user : result.user,
                title : result.title,
                created : result.created,
                thumbnail : result.thumbnail,
                content : result.content
            }
        })
        
        if (!result) return res.status(200).json({
            message : 'success',
            print : []
        })

        return

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}
