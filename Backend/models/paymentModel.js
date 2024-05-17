const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  dtpcode: {
    type: String,
    // required: true
  },
  username: {
    type: String,
    // required: true
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  payment_amount: {
    type: Number,
    // required: true
  },
  payment_type: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Cash'], // Example payment types
    // required: true
  },
  action: {
    type: String,
    enum: ['Completed', 'Pending', 'Failed', 'Refunded'], // Example actions
    // required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
