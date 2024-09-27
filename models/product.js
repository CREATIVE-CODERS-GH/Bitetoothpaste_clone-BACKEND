import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        // required: true
    },
    image: {
        type: String,
        // required: true,
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        // required: true
    },
},
    {
        timestamps: true, 
    });


export const Product = mongoose.model('Product', productSchema);