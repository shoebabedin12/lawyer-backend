const lawyerModel = require('../models/lawyerModel');

exports.getAll = async (req, res) => {
  try {
    const lawyers = await lawyerModel.getAllLawyers();
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const lawyer = await lawyerModel.getLawyerById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: 'Not found' });
    res.json(lawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newLawyer = await lawyerModel.createLawyer(req.body);
    res.status(201).json(newLawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await lawyerModel.updateLawyer(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await lawyerModel.deleteLawyer(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
