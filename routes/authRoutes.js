import { Router } from "express";
import {registerUser, login, verifyEmail, forgotPassword, resetPassword, logout} from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post('/register', registerUser);

authRouter.post('/login', login);

authRouter.post('/verify-email', verifyEmail);

authRouter.post('/forgot-password', forgotPassword);

authRouter.post('/reset-password/:token', resetPassword);

authRouter.post('/logout', logout);




