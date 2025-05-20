const express = require('express');
const router = express.Router();
const {
  createPayment,
  updatePaymentStatus,
  getUserPayments,
} = require('../controllers/paymentController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createPayment);
router.get('/', protect, getUserPayments);
router.put('/:id/status', protect, adminOnly, updatePaymentStatus);

module.exports = router;
