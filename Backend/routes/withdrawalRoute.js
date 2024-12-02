import { Router } from "express";
import { cancelWithdrawalRequest, completeWithdrawal, getWithdrawals, requestWithdrawal } from "../controllers/withdrawalController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

export const withdrawalRouter = Router();

withdrawalRouter.post('/withdrawals', authenticateUser, requestWithdrawal);
withdrawalRouter.get('/withdrawals', authenticateUser, getWithdrawals);
withdrawalRouter.patch('/withdrawals/:withdrawalId/complete', authenticateUser, completeWithdrawal);
withdrawalRouter.patch('/withdrawals/:withdrawalId/cancel', authenticateUser, cancelWithdrawalRequest);


