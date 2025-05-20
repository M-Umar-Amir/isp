const User = require('../models/User');
const Package = require('../models/Package');

// Get logged in user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('plan');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user subscription plan
exports.updatePlan = async (req, res) => {
  const { packageId } = req.body;
  try {
    const pack = await Package.findById(packageId);
    if (!pack) return res.status(404).json({ message: 'Package not found' });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { plan: packageId },
      { new: true }
    ).populate('plan');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
