import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'
import questionRouter from './router/route.js'
import connectDB from './database/connection.js'
const app = express()

// Middleware
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
config()

const port = process.env.PORT || 8080

app.use('/api', questionRouter)

app.get('/', (req, res) => {
  try {
    res.json('Get request')
  } catch (err) {
    res.json({ error: err })
  }
})

connectDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`)
      })
    } catch (error) {
      console.log('Cannot connect to the server')
    }
  })
  .catch((error) => {
    console.log('Invalid Database Connection')
  })
