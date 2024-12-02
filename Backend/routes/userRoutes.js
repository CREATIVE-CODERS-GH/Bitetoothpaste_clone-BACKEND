import { getUser } from "../controllers/userController.js";
import { Router } from "express";

export const userRouter = Router();

userRouter.get('/users', getUser);
// userRouter.get('/users/:id', getUser);
// userRouter.put('/users/:id', updateUser);
// userRouter.delete('/users/:id', deleteUser);