import { Router } from "express";
import { storesAllGet, storesInventoryGet, storesNewGet, storesNewPost, storesUpdateInventoryGet } from "../controllers/storesController.js";

const storesRouter: Router = Router();

storesRouter.get("/all", storesAllGet);
storesRouter.get("/new", storesNewGet);
storesRouter.get("/:id", storesInventoryGet);
storesRouter.get("/:id/update-inventory", storesUpdateInventoryGet);
storesRouter.post("/new", storesNewPost);

export default storesRouter;