import express from 'express'
import "dotenv/config"
import passport from 'passport'
import session from 'express-session'

import { authRouter} from './routes/authRoutes.js'
import { productRouter} from './routes/productRoutes.js'
import { userRouter} from './routes/userRoutes.js'
import { connectDB } from './config/db.js'
import './config/passport.js'



// Initialize Express
const app = express()


//Middleware for session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


//  Initialize Routes
app.use(express.json())
app.use("/api/v1", authRouter)
app.use("/api/v1", productRouter)
app.use("/api/v1", userRouter)

// for google sign up
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
    });





const PORT = process.env.PORT || 3000

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port, " + PORT + "")
    })
})


