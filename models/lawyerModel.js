const pool = require('../db');

const getAllLawyers = async () => {
  const res = await pool.query('SELECT * FROM lawyers ORDER BY id DESC');
  return res.rows;
};

const getLawyerById = async (id) => {
  const res = await pool.query('SELECT * FROM lawyers WHERE id = $1', [id]);
  return res.rows[0];
};

const createLawyer = async ({ name, specialization, image }) => {
  const res = await pool.query(
    'INSERT INTO lawyers (name, specialization, image) VALUES ($1, $2, $3) RETURNING *',
    [name, specialization, image]
  );
  return res.rows[0];
};

const updateLawyer = async (id, { name, specialization, image }) => {
  const res = await pool.query(
    'UPDATE lawyers SET name = $1, specialization = $2, image = $3 WHERE id = $4 RETURNING *',
    [name, specialization, image, id]
  );
  return res.rows[0];
};

const deleteLawyer = async (id) => {
  await pool.query('DELETE FROM lawyers WHERE id = $1', [id]);
};

module.exports = {
  getAllLawyers,
  getLawyerById,
  createLawyer,
  updateLawyer,
  deleteLawyer,
};
