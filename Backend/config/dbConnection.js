import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL)
        console.log('db conncted success', con.connection.host)
    } catch (error) {
        console.log(error)
    }
}