const express = require('express');
const { getAdminWithProfile, createAdmin } = require('../../controllers/adminController');
const verifyToken = require('../../middleware/verifyToken');
const router = express.Router();

router.get('/admin/:id', verifyToken, getAdminWithProfile);
router.post('/admin-create', createAdmin);

module.exports = router;
