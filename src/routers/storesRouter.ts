import { Router } from "express";
import { storesAllGet, storesInventoryGet, storesNewGet, storesNewPost, storesUpdateInventoryGet, storesUpdateInventoryPost } from "../controllers/storesController.js";

const storesRouter: Router = Router();

storesRouter.get("/all", storesAllGet);
storesRouter.get("/new", storesNewGet);
storesRouter.get("/:id", storesInventoryGet);
storesRouter.get("/:id/update-inventory", storesUpdateInventoryGet);
storesRouter.post("/new", storesNewPost);
storesRouter.post("/:id/update-inventory", storesUpdateInventoryPost);

export default storesRouter;