
// ?limit=5&offset=0
export const bridgeFetchAll = async ( req, res, next ) => {

    try {

        // 1. fetch query value
        const { limit, offset } = req.query

        if (isNaN(limit) || isNaN(offset)) {
            throw new Error('NOT_NUMBER');
        }
        
        return
        req.data = { limit , offset }
        next()

    } catch (err) {
        // handle error
        console.error(err)
        if (err.message === 'NOT_NUMBER') {
            return res.status(400).json({
                error: 'limit & offset have to number'
            });
        }
        
    }

}