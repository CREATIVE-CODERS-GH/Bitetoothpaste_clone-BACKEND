import { transporter } from "../config/emailConfig.js";
import { User } from "../models/user.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } from "../utils/emailTemplates.js";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = email;
    try {
        const response = await transporter.sendMail({
            to: recipient,
            from: process.env.EMAIL_USER,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)

        })
        console.log("Verification Email sent successfully")
    } catch (error) {
        console.log("Error sending verification email", error)
        throw new Error(`Failed to send verification email: ${error.message}`)
    }
}

export const sendWelcomeEmail = async (email, firstName, companyName) => {
    const recipient = email;
    const user = await User.findOne({ email });
    firstName = user.firstName;
    companyName = "Bitetoothpastebits";

    try {
        const response = await transporter.sendMail({
            to: recipient,
            from: process.env.EMAIL_USER,
            subject: "Welcome to Bitetoothpastebits",
            html: WELCOME_EMAIL_TEMPLATE(firstName, companyName)
        })

        console.log(" Welcome Email sent successfully")
    } catch (error) {
        console.log("Error sending Welcome email", error)
        throw new Error(`Failed to send Welcome email: ${error.message}`)
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = email;
    try {
        const response = await transporter.sendMail({
            to: recipient,
            from: process.env.EMAIL_USER,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
        })
        console.log("Password Reset Email sent successfully");
    } catch (error) {
        console.log("Error sending password reset email", error)

        throw new Error(`Failed to send password reset email:${error.message}`);
    }
};

export const sendPasswordResetSuccessEmail = async (email) => {
   const recipient = email;
   
   try {
    const response = await transporter.sendMail({
        to:recipient,
        from: process.env.EMAIL_USER,
        subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE
    })
    console.log("Password Reset Success Email sent successfully");
   } catch (error) {
    console.log("Error sending password reset email", error)

        throw new Error(`Failed to send password reset email:${error.message}`);
   }
 };