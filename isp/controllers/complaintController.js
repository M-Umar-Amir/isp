const Complaint = require('../models/Complaint');

// Create complaint
exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      user: req.user._id,
      subject: req.body.subject,
      description: req.body.description,
    });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all complaints (admin only)
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'name email');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update complaint status (admin)
exports.updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    complaint.status = status;
    if (status === 'resolved') complaint.resolvedAt = Date.now();
    await complaint.save();

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
