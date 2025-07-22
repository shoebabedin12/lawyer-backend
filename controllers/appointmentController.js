const model = require('../models/appointmentModel');

exports.getAll = async (req, res) => {
  const data = await model.getAllAppointments();
  res.json(data);
};

exports.getByUser = async (req, res) => {
  const data = await model.getUserAppointments(req.params.userId);
  res.json(data);
};

exports.getByLawyer = async (req, res) => {
  const data = await model.getLawyerAppointments(req.params.lawyerId);
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await model.createAppointment(req.body);
  res.status(201).json(data);
};

exports.updateStatus = async (req, res) => {
  const data = await model.updateAppointmentStatus(req.params.id, req.body.status);
  res.json(data);
};

exports.remove = async (req, res) => {
  await model.deleteAppointment(req.params.id);
  res.json({ message: 'Deleted' });
};
