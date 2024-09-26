import { User } from "../models/user.js";

export const getUser = async (req, res) => {
    try {
        const email = req.query.email?.toLowerCase(); 
        const userName = req.query.userName?.toLowerCase();
    
        const filter = {};
        if (email) {
            filter.email = email;
        }
        if (userName) {
            filter.userName = userName;
        }
    
        const user = await User.find(filter);

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: user
        });
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the user",
            error: error.message
        });
    }
};


 
 export const updateUser = async (req, res) => {};
 export const deleteUser = async (req, res) => {};