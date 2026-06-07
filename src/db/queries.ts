import type { ProductType } from "../types/product.type.js";
import type { StoreType } from "../types/store.type.js";
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

const getProductById = async (id: ProductType["id"]) => {
  const { rows } = await db.query('select * from product where id=$1', [id]);

  return rows[0]; // Should only fetch one product
};

const postNewProduct = async (newProduct: ProductType) => {
  await db.query(`
    insert into product (id, name, description, categoryid) 
    values ($1, $2, $3, $4)`,
    [newProduct.id, newProduct.name, newProduct.description, newProduct.categoryid]
  );
};

// Stores
const postNewStore = async (newStore: StoreType) => {
  await db.query(`
    insert into store (id, name)
    values ($1, $2)`,
    [newStore.id, newStore.name]
  );
};

export {
  getAllCategories,
  getAllProducts,
  getProductById,
  postNewProduct,
  postNewStore
};