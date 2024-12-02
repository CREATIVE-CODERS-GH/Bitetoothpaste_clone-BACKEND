import { Investment } from "../models/investment.js";
import { User } from "../models/user.js";
import investmentValidationSchema from "../validation_schema/investmentValidationSchema.js";

// Helper function to calculate the profit based on selling duration
const calculateProfit = (sellingDuration, productQuantity) => {
    let profitPerProduct = 0;

    if (sellingDuration === "1 week") {
        profitPerProduct = 2; // Profit per product for 1 week
    } else if (sellingDuration === "2 weeks") {
        profitPerProduct = 4.5; // Profit per product for 2 weeks
    } else if (sellingDuration === "1 month") {
        profitPerProduct = 10; // Profit per product for 1 month
    } else {
        throw new Error("Invalid selling duration");
    }

    return productQuantity * profitPerProduct;
};

// Helper function to calculate the end date based on selling duration
const calculateEndDate = (startDate, sellingDuration) => {
    const endDate = new Date(startDate);

    if (sellingDuration === "1 week") {
        endDate.setDate(endDate.getDate() + 7); // Add 7 days
    } else if (sellingDuration === "2 weeks") {
        endDate.setDate(endDate.getDate() + 14); // Add 14 days
    } else if (sellingDuration === "1 month") {
        endDate.setMonth(endDate.getMonth() + 1); // Add 1 month
    } else {
        throw new Error("Invalid selling duration");
    }

    return endDate;
};

// Helper function to extend end date based on the selling duration
const getExtendedEndDate = (endDate, sellingDuration) => {
    const updatedEndDate = new Date(endDate);

    if (sellingDuration === '1 week') {
        updatedEndDate.setDate(updatedEndDate.getDate() + 7); // Add 1 week
    } else if (sellingDuration === '2 weeks') {
        updatedEndDate.setDate(updatedEndDate.getDate() + 14); // Add 2 weeks
    } else if (sellingDuration === '1 month') {
        updatedEndDate.setMonth(updatedEndDate.getMonth() + 1); // Add 1 month
    }

    return updatedEndDate;
};






export const createInvestment = async (req, res, next) => {
    try {
        // Validate user input using Joi schema
        const { error, value } = investmentValidationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }


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

        // Extract validated values
        const { productQuantity, sellingDuration, startDate } = value;

        // Add default product price
        const productPrice = 80;

        // Calculate total amount
        const amountPaid = productQuantity * productPrice;

        // Calculate initial profit
        const profit = calculateProfit(sellingDuration, productQuantity);

        // Calculate end date
        const endDate = calculateEndDate(startDate, sellingDuration);

        //Calculate Total Funds
        const totalFunds = amountPaid + profit;



        // Create the investment
        const investment = await Investment.create({
            userId: user._id,
            productQuantity,
            productPrice,
            productName: "Fosuaa Men Powder",
            amountPaid,
            sellingDuration,
            startDate,
            endDate,
            profit,
            totalFunds,
            status: "active",
        });

        // Add investment ID to user's investment array
        user.investments.push(investment._id);
        await user.save();

        // Send success response
        res.status(201).json({
            success: true,
            message: "Investment created successfully",
            investment,
        });
    } catch (error) {
        console.error("Error in createInvestment:", error); // Log error for debugging
        next(error);
    }
};


export const getInvestment = async (req, res, next) => {
    try {

        const investments = await Investment.find({ userId: req.userId })
        if (investments.length == 0) {
            return res.status(404).send({ message: 'No investments found' })
        }
        res.status(200).json({
            success: true,
            message: "Investments fetched successfully",
            investments
        })

    } catch (error) {
        next(error);
    }



};

export const rolloverInvestment = async (req, res, next) => {
    try {
        const { investmentId } = req.params;

        if (!investmentId) {
            return res.status(400).json({
                success: false,
                message: "Investment ID is required.",
            });
        }

        // Find the existing investment
        const investment = await Investment.findById(investmentId);
        if (!investment) {
            return res.status(404).json({
                success: false,
                message: "Investment not found.",
            });
        }

        // Check if the investment is already rolled over
        if (investment.isRolledOver) {
            return res.status(400).json({
                success: false,
                message: "Investment has already been rolled over.",
            });
        }

        // Extract necessary fields
        const { totalFunds, productPrice, startDate, sellingDuration } = investment;

        console.log({ totalFunds, productPrice, startDate, sellingDuration });

      
        // Check for division by zero
        if (productPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Product price must be greater than zero.",
            });
        }

        // Calculate the new product quantity and balance
        const productQuantity = Math.floor(totalFunds / productPrice);
        const balance = totalFunds % productPrice;

        // Check for invalid productQuantity or balance
        if (isNaN(productQuantity) || isNaN(balance)) {
            return res.status(400).json({
                success: false,
                message: "Error calculating product quantity or balance.",
            });
        }

        // Calculate the new profit
        const profit = calculateProfit(sellingDuration, productQuantity);

        // Validate profit
        if (isNaN(profit)) {
            return res.status(400).json({
                success: false,
                message: "Error calculating profit.",
            });
        }

        // Calculate the new end date
        const newEndDate = getExtendedEndDate(investment.endDate, investment.sellingDuration);

        // Validate endDate
        if (isNaN(new Date(newEndDate).getTime())) {
            return res.status(400).json({
                success: false,
                message: "Error calculating end date.",
            });
        }
        // calculate the new totalFunds
        const newTotalFunds = totalFunds + profit + balance;



        // Update the investment
        investment.productQuantity = productQuantity;
        investment.profit = profit;
        investment.balance = balance;
        investment.endDate = newEndDate;
        investment.totalFunds = newTotalFunds;
        investment.isRolledOver = true;

        console.log({ productQuantity, profit, balance });

        // Save the investment
        await investment.save();

        res.status(200).json({
            success: true,
            message: "Investment successfully rolled over.",
            investment,
        });
    } catch (error) {
        console.error("Error in rolloverInvestment:", error);
        next(error);
    }
};


















export const updateInvestment = async (req, res) => {


};

export const deleteInvestment = async (req, res) => {

};
