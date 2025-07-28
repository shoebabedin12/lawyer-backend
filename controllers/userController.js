const { User } = require('../models');

// GET /api/v1/me
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.user?.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      data: user,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
};

// PUT /api/v1/me
const updateMe = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByPk(req.user.user?.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name;
    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed", error: err.message });
  }
};

module.exports = { getMe, updateMe };
