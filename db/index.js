import mongoose from 'mongoose';

import * as dotenv from 'dotenv'

dotenv.config()

const connectDb = async () => {
    try {
        const x = await mongoose.connect (
            process.env.MONGO_URI 
        )
        console.log('Connected to Mongo!')
    } catch (error) {
        console.error(error)
    }
}

connectDb()