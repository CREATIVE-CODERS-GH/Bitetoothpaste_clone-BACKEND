import { Router } from "express";
import {registerUser, login, verifyEmail, forgotPassword, resetPassword, logout} from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post('/auth/register', registerUser);

authRouter.post('/auth/login', login);

authRouter.post('/auth/verify-email', verifyEmail);

authRouter.post('/auth/forgot-password', forgotPassword);

authRouter.post('/auth/reset-password/:token', resetPassword);

authRouter.post('/auth/logout', logout);




