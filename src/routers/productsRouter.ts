import { Router } from "express";
import { productsAllGet, productsNewGet, productsNewPost } from "../controllers/productsController.js";

const productsRouter: Router = Router();

productsRouter.get("/all", productsAllGet);
productsRouter.get("/new", productsNewGet);
productsRouter.post("/new", productsNewPost);

export { productsRouter };