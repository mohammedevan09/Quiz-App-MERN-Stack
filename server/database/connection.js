import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const connectDB = async () => {
  await mongoose.connect(process.env.ATLAS_URL)
  console.log('Database connected')
}

export default connectDB
