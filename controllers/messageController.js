const model = require('../models/messageModel');

exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await model.getMessagesBetween(user1, user2);
  res.json(messages);
};

exports.send = async (req, res) => {
  const msg = await model.sendMessage(req.body);
  res.status(201).json(msg);
};
