import { Withdrawal } from "../models/withdrawal.js";
import { User } from "../models/user.js";
import { Investment } from "../models/investment.js";




// Request a withdrawal
export const requestWithdrawal = async (req, res) => {
    try {

        // Extract user session ID from request
        const userSessionId = req.userId;
        if (!userSessionId) {
            return res.status(401).json({ success: false, message: "Unauthorized. User session missing." });
        }

        // Find the user in the database
        const user = await User.findById(userSessionId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { amount, modeOfPayout, investmentId } = req.body;

        if (!amount || !modeOfPayout || !investmentId) {
            return res.status(400).json({
                success: false,
                message: "Amount, mode of payout, and investment ID are required.",
            });
        }

        // Validate investment ID
        const investment = await Investment.findById(investmentId);
        if (!investment) {
            return res.status(404).json({ success: false, message: "Investment not found." });
        }

        // Ensure the investment has sufficient total funds
        if (investment.totalFunds < amount) {
            return res.status(400).json({
                success: false,
                message: "Insufficient funds in the investment for this withdrawal.",
            });
        }

        // Create a new withdrawal record

        const withdrawal = await Withdrawal.create({
            userId: user._id,
            investmentId,
            amount,
            modeOfPayout
        });

        // Add withdrawal ID to user's withdrawal array       
        user.withdrawals.push(withdrawal._id);
        await user.save();

        // Add withdrawal ID to the investment's withdrawal array
        investment.withdrawals.push(withdrawal._id);
        await investment.save();

        res.status(201).json({ message: 'Withdrawal requested successfully', withdrawal });
    } catch (err) {
        res.status(400).json({ error: 'Error requesting withdrawal', details: err.message });
    }
};

// Get withdrawal history
export const getWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Withdrawal.find({ userId: req.userId });
        if (!withdrawals) {
            return res.status(404).json({ error: 'No withdrawals found' });
        }
        res.status(200).json(withdrawals);
    } catch (err) {
        res.status(400).json({ error: 'Error fetching withdrawals', details: err.message });
    }
};


export const completeWithdrawal = async (req, res, next) => {
    try {
        const { withdrawalId } = req.params;

        // Validate withdrawal ID
        if (!withdrawalId) {
            return res.status(400).json({
                success: false,
                message: "Withdrawal ID is required.",
            });
        }

        // Find the withdrawal record
        const withdrawal = await Withdrawal.findById(withdrawalId);
        if (!withdrawal) {
            return res.status(404).json({
                success: false,
                message: "Withdrawal not found.",
            });
        }

        // Check if the withdrawal is already completed
        if (withdrawal.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Withdrawal has already been completed.",
            });
        }

        // Find the associated investment record
        const investment = await Investment.findById(withdrawal.investmentId); // Assuming `investmentId` is stored in the Withdrawal model
        if (!investment) {
            return res.status(404).json({
                success: false,
                message: "Investment associated with the withdrawal not found.",
            });
        }

        // Ensure the investment has sufficient total funds
        if (investment.totalFunds < withdrawal.amount) {
            return res.status(400).json({
                success: false,
                message: "Insufficient total funds in the investment for this withdrawal.",
            });
        }

        // Update the withdrawal status to "completed"
        withdrawal.status = "completed";
        await withdrawal.save();

        // Deduct the withdrawal amount from the investment's total funds
        investment.totalFunds -= withdrawal.amount;
        // await investment.save();

        // Check if total funds reach 0 and update status to 'completed'
        if (investment.totalFunds === 0) {
            investment.status = "completed"; // Automatically mark as completed
        }

        // Save updated investment
        await investment.save();


        res.status(200).json({
            success: true,
            message: "Withdrawal completed successfully.",
            withdrawal,
            updatedTotalFunds: investment.totalFunds,
        });
    } catch (error) {
        console.error("Error in completeWithdrawal:", error);
        next(error);
    }
};

export const cancelWithdrawalRequest = async (req, res) => {
    try {
        // Extract withdrawal ID from request parameters
        const { withdrawalId } = req.params;

        if (!withdrawalId) {
            return res.status(400).json({
                success: false,
                message: "Withdrawal ID is required.",
            });
        }

        // Find the withdrawal request in the database
        const withdrawal = await Withdrawal.findById(withdrawalId);
        if (!withdrawal) {
            return res.status(404).json({
                success: false,
                message: "Withdrawal request not found.",
            });
        }

        // Ensure the withdrawal request is still pending
        if (withdrawal.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Only pending withdrawals can be canceled.",
            });
        }


        // Update the withdrawal status to 'canceled'
        withdrawal.status = "canceled";
        await withdrawal.save();

        res.status(200).json({
            success: true,
            message: "Withdrawal request successfully canceled.",
            withdrawal,
        });
    } catch (error) {
        console.error("Error in cancelWithdrawalRequest:", error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while canceling the withdrawal request.",
            error: error.message,
        });
    }
};