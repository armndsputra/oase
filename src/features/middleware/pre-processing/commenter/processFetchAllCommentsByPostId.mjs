import mongoose from 'mongoose';

import Post from '../../../models/postModel.mjs';

export const processFetchAllCommentsByPostId = async (req, res, next) => {

    try {

        const postId = req.params.id;
        const userId= req.decode.id
        
        // Validate postId
        if (!postId) {
            return res.status(400).json({ 
                success: false,
                message : 'Post ID is required' 
            });
        }

        // Check if postId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(400).json({ 
            success: false,
            message : 'incorrect ID entered!'
        })

        // Check if post exists and belongs to the user
        const post = await Post.findById(postId);

        // ACCESS USER MUST BE THE OWNER OF THE POST TO VIEW COMMENTS
        if (post.user.toString() !== userId) {
            return res.status(403).json({ 
                success: false,
                message : 'forbidden : you do not have permission to view these comments.' 
            });
        }

        // NEXT MIDDLEWARE
        req.data = postId
        next()


    } catch (err) {
        console.error(err)
        return res.status(500).json({ 
            success: false,
            message : 'error in fetch comment by postId pre processing', 
        });
    }
}