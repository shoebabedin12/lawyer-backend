const { Lawyer, User, UserProfile } = require("../models");
const lawyer = require("../models/lawyer");

const getAll = async (req, res) => {
  try {
    const lawyers = await Lawyer.findAndCountAll({
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "name", "email"],
        },
      ],
      limit: 10,
      offset: 0,
      order: [["createdAt", "DESC"]],
    });
    // res.json(lawyers);
    // Structure response
    res.status(200).json({
      total: lawyers.count, // 🔢 total number of lawyers
      lawyers: lawyers.rows, // 🧾 array of lawyer objects
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const userId = req.user.id;
    const lawyer = await Lawyer.findOne({
      where: { userId },
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: UserProfile },
      ],
    });
    

    if (!lawyer) return res.status(404).json({ message: "Lawyer not found" });

    // Remove password or sensitive fields
    const { password, ...lawyerData } = lawyer.toJSON(); // if using Sequelize
    
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
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAppoinmentList = async (req, res)=>{

}

module.exports = { getAll, getOne, create, update, remove, getAllAppoinmentList};
