const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
} = require('../controllers/complaintController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createComplaint);
router.get('/', protect, adminOnly, getAllComplaints);
router.put('/:id/status', protect, adminOnly, updateComplaintStatus);

module.exports = router;
