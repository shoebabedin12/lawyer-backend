const express = require('express');
const router = express.Router();
const authRouter = require("./../auth")
const userRouter = require('./../user')
const lawyerRouter = require('./../lawyer')
const adminRouter = require('./../admin')



router.use('/auth', authRouter);
router.use('/', adminRouter);
router.use('/', userRouter);
router.use('/', lawyerRouter);

module.exports = router;