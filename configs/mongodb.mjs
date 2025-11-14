import mongoose from 'mongoose'

const URL = process.env.MONGODB_URL

export const connectMongodb = async () => {

    try {

        await mongoose.connect(URL);
        console.info('connected to database successfully');

        // shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close()
            console.info('database connection closed')
            process.exit(0)
        });

    } catch (err) {
        console.error('database connection failed:', err);
        process.exit(1);
    }

}