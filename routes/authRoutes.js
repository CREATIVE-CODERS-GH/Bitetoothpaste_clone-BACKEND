import { Router } from "express";
import passport from "passport";
import { registerUser, login, verifyEmail, forgotPassword, resetPassword, logout, googleLogin, googleCallback, loginFailed, userLogout, isLoggedIn, userProtected,} from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post('/auth/register', registerUser);

authRouter.post('/auth/login', login);

authRouter.post('/auth/verify-email', verifyEmail);

authRouter.post('/auth/forgot-password', forgotPassword);
 
authRouter.post('/auth/reset-password/:token', resetPassword);

authRouter.post('/auth/logout', logout);

authRouter.get('/auth/google',googleLogin);

authRouter.get('/auth/google/callback', googleCallback)

authRouter.get('/login/failed', loginFailed)

authRouter.get('/logout', userLogout)

authRouter.get('/protected', isLoggedIn,userProtected)

