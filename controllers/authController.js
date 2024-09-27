import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/user.js";
import { generateJWT } from "../middlewares/authMiddleware.js"
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail } from "../utils/emailService.js";
import userValidationSchema from "../validation_schema/userValidationSchema.js";
import passport from "passport";


export const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};


export const registerUser = async (req, res) => {

    // Validate user input using Joi schema
    const { error } = userValidationSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { firstName, lastName, email, password, userName } = req.body;
    if (!userName) {
        return res.status(400).json({
            success: false,
            message: 'Username is required',
        });
    }


    try {
        const userAlReadyExists = await User.findOne({ email })
        if (userAlReadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // generate 6 digit verification token 

        // Create  User
        const user = await User.create({
            firstName,
            lastName,
            email,
            userName,
            password: hashedPassword,
            verificationToken,
            verificationExpires: Date.now() + 3600000, // 1 hour 
        })

        //Generate JWT Token
        generateJWT(res, user._id);

        //send verification email
        sendVerificationEmail(user.email, verificationToken);


        //send response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,

            }
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }

};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({ verificationToken: code, verificationExpires: { $gt: Date.now() } });
        console.log(user)
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });

        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpires = undefined;
        await user.save();

        // Send Welcome Email
        await sendWelcomeEmail(user.email, user.firstName, "Bitetoothpastebits");

        res.status(200).json({ success: true, message: "Email verified successfully" });


    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" })
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
        generateJWT(res, user._id);

        user.lastLogin = Date.now();
        await user.save();

        //send response
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                ...user._doc,
                password: undefined,

            }
        })

    } catch (error) {
        console.log("Error in Login", error);
        res.status(400).json({ success: false, message: error.message })
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" })
        }
        // Generate Reset Token

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 3600000;

        user.passwordResetToken = resetToken;
        user.passwordResetExpires = resetTokenExpiresAt;
        await user.save();

        // Send Reset Email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({ success: true, message: "Password reset link sent to your email" })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })

    }
};

export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;
        const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        // update password
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // Send Email
        await sendPasswordResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successful" });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "User logged out successfully" })
};


export const googleLogin = passport.authenticate('google', {
    scope: ['profile', 'email']
}
);


export const googleCallback = passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/login/failed'
})  // callback route after Google login')


export const loginFailed = (req, res) => {
    res.status(401).json({ error: true, message: "Login Failed" })
};



export const userLogout = (req, res, next) => {
    req.logout((err) => {  // logout now requires a callback in newer versions
        if (err) { return next(err); }
        req.session.destroy();  // Destroy the session after logout
        res.send('Goodbye!');
    });
};


export const userProtected = (req,res) =>{
    res.send(`Hello, ${req.user.displayName}!`)
};

