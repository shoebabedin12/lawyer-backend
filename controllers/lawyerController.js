const { Lawyer, User } = require('../models');

const getAll = async (req, res) => {
  try {
    const lawyers = await Lawyer.findAll({
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const lawyer = await lawyerModel.getLawyerById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: 'Not found' });
    res.json(lawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newLawyer = await lawyerModel.createLawyer(req.body);
    res.status(201).json(newLawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await lawyerModel.updateLawyer(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await lawyerModel.deleteLawyer(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove};