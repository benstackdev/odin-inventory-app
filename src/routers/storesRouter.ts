import { Router } from "express";
import { storesAllGet, storesInventoryGet, storesNewGet, storesNewPost } from "../controllers/storesController.js";

const storesRouter: Router = Router();

storesRouter.get("/all", storesAllGet);
storesRouter.get("/new", storesNewGet);
storesRouter.get("/:id", storesInventoryGet);
storesRouter.post("/new", storesNewPost);

export default storesRouter;