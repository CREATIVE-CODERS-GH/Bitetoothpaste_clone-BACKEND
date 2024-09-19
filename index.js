import express from 'express'
import "dotenv/config"

import { authRouter} from './routes/authRoutes.js'
import { productRouter} from './routes/productRoutes.js'
import { connectDB } from './config/db.js'

const app = express()


app.use(express.json())
app.use("/api/v1", authRouter)
app.use("/api/v1", productRouter)



const PORT = process.env.PORT || 3000

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port, " + PORT + "")
    })
})



// ufma qiei fges grfp