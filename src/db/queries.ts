import type { ProductType } from "../types/product.type.js";
import db from "./pool.js";

const getAllCategories = async () => {
  const { rows } = await db.query('select * from category');
  return rows;
};

// Products
const getAllProducts = async () => {
  const { rows } = await db.query('select * from product');
  return rows;
};

const postNewProduct = async (newProduct: ProductType) => {
  await db.query(`
    insert into product (id, name, description, categoryid) 
    values ($1, $2, $3, $4)`,
    [newProduct.id, newProduct.name, newProduct.description, newProduct.categoryid]
  );
};

export {
  getAllCategories,
  getAllProducts,
  postNewProduct
};