import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { activityCardRoutes, userRoutes } from './src/routes/index.js'

dotenv.config()

const app = express()
const PORT = 5000

app.use(cors({
  origin: '*'
}))
app.use(express.json())

app.use('/activityCards', activityCardRoutes)
app.use('/users', userRoutes)

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`Server is running on port: ${PORT}`)
  app.listen(PORT)
})