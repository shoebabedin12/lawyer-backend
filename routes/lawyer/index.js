const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove, getAllAppoinmentList} = require('./../../controllers/lawyerController');
const verifyToken = require('../../middleware/verifyToken');

// public route
router.get('/', getAll);
// protected route
router.get('/me', verifyToken, getOne);
router.get('/appointments', verifyToken, getAllAppoinmentList);
// router.post('/', create);
// router.put('/:id', update);
// router.delete('/:id', remove);

module.exports = router;
