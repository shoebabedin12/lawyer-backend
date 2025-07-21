require("dotenv").config();
const express = require("express");
const cors = require("cors");
const lawyerRoutes = require('./routes/lawyerRoutes');

const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/lawyers', lawyerRoutes);

// Add your routes here
app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
