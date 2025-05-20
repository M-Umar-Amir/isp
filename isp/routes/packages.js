const express = require('express');
const router = express.Router();
const {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} = require('../controllers/packageController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getPackages);
router.post('/', protect, adminOnly, createPackage);
router.put('/:id', protect, adminOnly, updatePackage);
router.delete('/:id', protect, adminOnly, deletePackage);

module.exports = router;
