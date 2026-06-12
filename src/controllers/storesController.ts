import type { Request, Response } from "express";
import type { StoreType } from "../types/store.type.js";
import { getAllProducts, getAllStores, getProductById, getStoreById, getStoreInventory, postNewStore, postStoreInventory, postStoreUpdate } from "../db/queries.js";
import type { InventoryType } from "../types/inventory.type.js";
import type { ProductInventoryType, ProductType } from "../types/product.type.js";
import { inventoryFilter } from "../utils/inventoryFilter.js";
import { matchedData, validationResult } from "express-validator";

// TODO: Refactor middleware functions to remove repeated store fetching code

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("storesNew", {
        title: "Add new store",
        errors: errors.array()
      });
    }

    // Data is validated; move on
    const { storeName } = matchedData(req);

    const newStore: StoreType = {
      id: crypto.randomUUID(),
      name: storeName
    };
    await postNewStore(newStore);

    res.redirect("/");
  } catch (error) { throw error; }
};

const storesUpdateGet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(404).json(`Store ID ${id} not found or invalid`);

    const store: StoreType = await getStoreById(id as StoreType["id"]);

    res.render("storesUpdate", {
      title: "Update store",
      store
    });
  } catch (error) { throw error; }
};

const storesUpdatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(404).json(`Store ID ${id} not found or invalid`);

    const name = req.body.storeName;

    await postStoreUpdate({ id: String(id), name });
    res.redirect(`/stores/${id}`);
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
    const allProducts: ProductType[] = await getAllProducts();
    const inventory: InventoryType[] = await getStoreInventory(store.id);

    const { inInventory, notInInventory } = inventoryFilter(allProducts, inventory);

    res.render("storesInventoryUpdate", {
      title: "Update inventory",
      store,
      inInventory,
      notInInventory
    });
  } catch (error) { throw error; }
};

const storesUpdateInventoryPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(404).json(`Store ID ${id} not found or invalid`);

    const store: StoreType = await getStoreById(id as StoreType["id"]);
    const allProducts = await getAllProducts();
    const newInventory: InventoryType[] = [];

    // constuct newInventory list based on view
    for (let product of allProducts) {
      if (req.body[`${product.id}-inInventory`]) {
        const amount = req.body[`${product.id}-amount`];
        newInventory.push({
          productid: product.id,
          storeid: store.id,
          amount,
          productname: product.name,
          storename: store.name
        });
      }
    }

    await postStoreInventory(store.id, newInventory);

    res.redirect(`/stores/${store.id}/`);
  } catch (error) { throw error; }
};

export {
  storesAllGet,
  storesNewGet,
  storesNewPost,
  storesUpdateGet,
  storesUpdatePost,
  storesInventoryGet,
  storesUpdateInventoryGet,
  storesUpdateInventoryPost
};