import { Router } from "express";
import { productsNewGet, productsNewPost } from "../controllers/productsController.js";

const productsRouter: Router = Router();

productsRouter.get("/new", productsNewGet);
productsRouter.post("/new", productsNewPost);

export { productsRouter };