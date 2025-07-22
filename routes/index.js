const express = require('express');
const router = express.Router();
const apiRoutes = require('./api')
const api = process.env.BASE_URL || '/api';

router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json({ message: "No API found" }));

module.exports = router;