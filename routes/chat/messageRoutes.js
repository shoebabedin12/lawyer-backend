const express = require('express');
const router = express.Router();
const controller = require('../../controllers/messageController');

router.get('/:user1/:user2', controller.getMessages);
router.post('/', controller.send);

module.exports = router;
