import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',

    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',

    },

    lastLogin: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    verificationToken: String,
    verificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});


export const User = mongoose.model('User', userSchema);


// reviews: [
//     {
//         productId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true,
//         },
//         content: {
//             type: String,
//             required: true,
//         },
//         rating: {
//             type: Number,
//             required: true,
//             min: 1,
//             max: 5,
//         },
//     },
// ],