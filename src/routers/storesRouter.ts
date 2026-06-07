import { Router } from "express";
import { storesAllGet, storesNewGet, storesNewPost } from "../controllers/storesController.js";

const storesRouter: Router = Router();

storesRouter.get("/all", storesAllGet);
storesRouter.get("/new", storesNewGet);
storesRouter.post("/new", storesNewPost);

export default storesRouter;