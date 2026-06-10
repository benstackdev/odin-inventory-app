import type { Request, Response } from "express";
import type { StoreType } from "../types/store.type.js";
import { getAllProducts, getAllStores, getStoreById, getStoreInventory, postNewStore } from "../db/queries.js";
import type { InventoryType } from "../types/inventory.type.js";
import type { ProductType } from "../types/product.type.js";

const storesAllGet = async (req: Request, res: Response) => {
  try {
    const stores: StoreType[] = await getAllStores();
    res.render("storesAll", {
      title: "All stores",
      stores
    });
  } catch (error) { throw error; }
};

const storesNewGet = (req: Request, res: Response) => {
  res.render("storesNew", { title: "Add new store" });
};

const storesNewPost = async (req: Request, res: Response) => {
  try {
    const newStore: StoreType = {
      id: crypto.randomUUID(),
      name: req.body.storeName
    };
    await postNewStore(newStore);

    res.redirect("/");
  } catch (error) { throw error; }
};

const storesInventoryGet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(404).json(`Store ID ${id} not found or invalid`);

    const store: StoreType = await getStoreById(id as StoreType["id"]);
    const inventory: InventoryType[] = await getStoreInventory(id as StoreType["id"]);

    res.render("storesInventory", {
      title: `${store.name} Inventory`,
      store,
      inventory
    });
  } catch (error) { throw error; }
};

const storesUpdateInventoryGet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(404).json(`Store ID ${id} not found or invalid`);

    const store: StoreType = await getStoreById(id as StoreType["id"]);
    const products: ProductType[] = await getAllProducts();

    res.render("storesInventoryUpdate", {
      title: "Update inventory",
      store,
      products
    });
  } catch (error) { throw error; }
};

export {
  storesAllGet,
  storesNewGet,
  storesNewPost,
  storesInventoryGet,
  storesUpdateInventoryGet
};