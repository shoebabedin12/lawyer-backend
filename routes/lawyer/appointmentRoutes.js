const express = require('express');
const router = express.Router();
const controller = require('../../controllers/appointmentController');

router.get('/', controller.getAll);
router.get('/user/:userId', controller.getByUser);
router.get('/lawyer/:lawyerId', controller.getByLawyer);
router.post('/', controller.create);
router.put('/:id/status', controller.updateStatus);
router.delete('/:id', controller.remove);

module.exports = router;
