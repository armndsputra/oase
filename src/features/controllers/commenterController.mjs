import Commenter from '../models/commenterModel.mjs'

export const commenter = async (req, res) => {
    try {

        const data = req.data

        const result = new Commenter(data)
        const savedCommenter = await result.save()

        res.status(201).json({
            scuccess: true,
            message: `Comment added to post ${data.content}`,
            comment: {
                id: savedCommenter._id,
                commenter: savedCommenter.commenter,
                content: savedCommenter.content,
                comment: savedCommenter.comment,
                created: savedCommenter.created 
            }
        });


     } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error', error: err.message })
    }
}