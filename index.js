import express from 'express'
import { connectDB } from './config/db.js'

const app = express()



const PORT = process.env.PORT || 3000

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port, " + PORT + "")
    })
})

