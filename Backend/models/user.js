import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    phone: { type: String, },
    country: { type: String, },
    city: { type: String, },
    modeOfPayout: {
        mobileMoney: {
            number: { type: String },
            accountName: { type: String }
        },
        bank: {
            accountName: { type: String },
            accountNumber: { type: String },
            bankName: { type: String }
        }
    },
    investments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investment' }],
    withdrawals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Withdrawal' }],
    nextOfKin: {
        name: { type: String, },
        contactDetails: { type: String, }
    },
    password: { type: String, required: true, },
    role: { type: String, enum: ['user', 'admin'], default: 'user', },
    lastLogin: { type: Date, default: Date.now() },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});


export const User = mongoose.model('User', userSchema);


