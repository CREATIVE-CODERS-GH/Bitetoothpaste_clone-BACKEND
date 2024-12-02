import mongoose from "mongoose";


const withdrawalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    investmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Investment', required: true },
    amount: { type: Number, required: true },
    modeOfPayout: { type: String, enum: ['mobileMoney', 'bank'], required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed','canceled' ] , default: 'pending' }
}, {
    timestamps: true,
});

export const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);