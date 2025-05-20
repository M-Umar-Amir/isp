const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  issuedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
