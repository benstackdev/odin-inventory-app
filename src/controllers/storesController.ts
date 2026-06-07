import type { Request, Response } from "express";
import type { StoreType } from "../types/store.type.js";
import { getAllStores, postNewStore } from "../db/queries.js";

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

export {
  storesAllGet,
  storesNewGet,
  storesNewPost
};