import mongoose from 'mongoose';



const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  withdrawals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Withdrawal' }],
  productQuantity: { type: Number, required: true,min: 0 },
  productPrice: { type: Number, required: true, default: 80 },
  productName: { type: String, default: 'Fosuaa Men Powder' },
  amountPaid: { type: Number, },
  sellingDuration: { type: String, required: true }, // e.g., 1 month, 2 weeks
  startDate: { type: Date, required: true },
  endDate: { type: Date, },
  isRolledOver: { type: Boolean, default: false },
  profit: { type: Number, required: true, min: 0 },
  totalFunds: { type: Number, required: true },
  balance: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'completed'], default: 'active' }
},
  { timestamps: true }
);

export const Investment = mongoose.model('Investment', investmentSchema);
