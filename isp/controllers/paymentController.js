const Payment = require('../models/Payment');

// Create a payment record
exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create({
      user: req.user._id,
      amount: req.body.amount,
      method: req.body.method,
      status: 'pending',
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update payment status (e.g., after confirmation)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    payment.status = req.body.status;
    await payment.save();

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user payments
exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
