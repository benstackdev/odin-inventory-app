import type { InventoryType } from "../types/inventory.type.js";
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

const deleteProductById = async (id: ProductType["id"]) => {
  // delete entries from inventory
  await db.query('delete from inventory where productid=$1', [id]);
  // delete entries from product
  await db.query('delete from product where id=$1', [id]);
};

const postNewProduct = async (newProduct: ProductType) => {
  await db.query(`
    insert into product (id, name, description, categoryid) 
    values ($1, $2, $3, $4)`,
    [newProduct.id, newProduct.name, newProduct.description, newProduct.categoryid]
  );
};

const postUpdateProduct = async (updatedProduct: ProductType) => {
  await db.query(`
    update product
    set description = $2, categoryid = $3
    where id = $1
    returning *
    `, [updatedProduct.id,
  updatedProduct.description,
  updatedProduct.categoryid]
  );
};

// Stores
const getAllStores = async () => {
  const { rows } = await db.query('select * from store');
  return rows;
};

const postNewStore = async (newStore: StoreType) => {
  await db.query(`
    insert into store (id, name)
    values ($1, $2)`,
    [newStore.id, newStore.name]
  );
};

const getStoreById = async (storeId: StoreType["id"]) => {
  const { rows } = await db.query('select * from store where id=$1', [storeId]);
  return rows[0];
};

const getStoreInventory = async (storeId: StoreType["id"]) => {
  const { rows } = await db.query(`
    select * from inventory
    where storeid=$1`,
    [storeId]
  );
  return rows;
};

const postStoreUpdate = async (store: StoreType) => {
  // update store list
  await db.query(`update store set name = $2 where id = $1 returning *`, [store.id, store.name]);

  // update all inventory entries for that store
  await db.query(`update inventory set storename = $2 where storeid = $1`, [store.id, store.name]);
};

const postStoreInventory = async (storeId: StoreType["id"], newInventory: InventoryType[]) => {
  // delete all existing inventory entries for storeId
  await db.query(`delete from inventory where storeid=$1`, [storeId]);

  // replace with new entries from middleware function
  let updateInventoryQuery = `insert into inventory (productid, storeid, amount, productname, storename) values `;

  newInventory.forEach((item, index) => {
    updateInventoryQuery += `('${item.productid}', '${item.storeid}', ${item.amount}, '${item.productname}', '${item.storename}')`;
    updateInventoryQuery += (index < newInventory.length - 1) ? ', ' : '';
  });

  console.log(updateInventoryQuery);

  await db.query(updateInventoryQuery);
};

export {
  getAllCategories,
  getAllProducts,
  getProductById,
  deleteProductById,
  postNewProduct,
  postUpdateProduct,
  getAllStores,
  postNewStore,
  postStoreUpdate,
  getStoreById,
  getStoreInventory,
  postStoreInventory
};