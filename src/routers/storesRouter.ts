import { Router } from "express";
import { storesNewGet, storesNewPost } from "../controllers/storesController.js";

const storesRouter: Router = Router();

storesRouter.get("/new", storesNewGet);
storesRouter.post("/new", storesNewPost);

export default storesRouter;