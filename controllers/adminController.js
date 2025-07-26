const { User, Admin } = require('../models');
const bcrypt = require('bcrypt');

const getAdminWithProfile = async (req, res) => {
  try {
    const admin = await User.findByPk(req.params.id, {
      include: ["adminProfile"],
    });

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, department, level, role, admin } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const adminTable = await Admin.create({
      userId: user.id,
      department:admin.department,
      level:admin.level,
    });

    res.status(201).json({ message: "Admin created successfully", adminTable });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


module.exports = { getAdminWithProfile, createAdmin };
