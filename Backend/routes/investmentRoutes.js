import { Router } from "express";
import { createInvestment, getInvestment, rolloverInvestment } from "../controllers/investmentController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";


export const investmentRouter = Router();

investmentRouter.post('/investments', authenticateUser, createInvestment);
investmentRouter.get('/investments',authenticateUser, getInvestment);
investmentRouter.patch('/investments/:investmentId/rollover', authenticateUser, rolloverInvestment);


// investmentRouter.put('/investments/:id', updateInvestment);
// investmentRouter.delete('/investments/:id', deleteInvestment);

