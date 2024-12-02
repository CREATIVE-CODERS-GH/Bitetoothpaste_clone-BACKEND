import express from 'express'
import "dotenv/config"
import passport from 'passport'
import session from 'express-session'
import { authRouter} from './routes/authRoutes.js'
import { userRouter} from './routes/userRoutes.js'
import { investmentRouter } from './routes/investmentRoutes.js'
import { withdrawalRouter } from './routes/withdrawalRoute.js'
import { connectDB } from './config/db.js'
import './config/passport.js'
import cookieParser from 'cookie-parser'




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

app.use(cookieParser())

//  Initialize Routes
app.use(express.json())
app.use( authRouter)
app.use( userRouter)
app.use( investmentRouter)
app.use( withdrawalRouter)




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


