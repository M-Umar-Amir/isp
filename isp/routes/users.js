const express = require('express');
const router = express.Router();
const { getProfile, updatePlan } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.put('/plan', protect, updatePlan);

module.exports = router;
