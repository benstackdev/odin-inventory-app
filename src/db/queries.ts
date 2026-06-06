import db from "./pool.js";

const getAllCategories = async () => {
  const { rows } = await db.query('select * from category');
  return rows;
};

export {
  getAllCategories
};