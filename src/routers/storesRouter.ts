import { Router } from "express";
import { storesAllGet, storesInventoryGet, storesNewGet, storesNewPost, storesUpdateGet, storesUpdateInventoryGet, storesUpdateInventoryPost, storesUpdatePost } from "../controllers/storesController.js";
import { validateStoresNew } from "../controllers/storesValidators.js";

const storesRouter: Router = Router();

storesRouter.get("/all", storesAllGet);
storesRouter.get("/new", storesNewGet);
storesRouter.get("/:id", storesInventoryGet);
storesRouter.get("/:id/update-inventory", storesUpdateInventoryGet);
storesRouter.get("/:id/update", storesUpdateGet);
storesRouter.post("/new", validateStoresNew, storesNewPost);
storesRouter.post("/:id/update-inventory", storesUpdateInventoryPost);
storesRouter.post("/:id/update", storesUpdatePost);

export default storesRouter;