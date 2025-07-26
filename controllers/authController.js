const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Lawyer, UserProfile } = require("../models");

const signup = async (req, res) => {
  try {
    const { name, email, password, role, specialization, experience } =
      req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 4. Conditionally create profile in related table
    if (role === "lawyer") {
      await Lawyer.create({
        userId: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        specialization,
        experience,
      });
    } else if (role === "user") {
      await UserProfile.create({
        userId: user.id,
      });
    }

    return res.status(201).json({
      message: "User signed up successfully",
      user: {user
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Signup failed", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { signup, login };
