import { Router } from "express";
import { productsAllGet, productsIdGet, productsNewGet, productsNewPost } from "../controllers/productsController.js";

const productsRouter: Router = Router();

productsRouter.get("/all", productsAllGet);
productsRouter.get("/new", productsNewGet);
productsRouter.get("/:id", productsIdGet);
productsRouter.post("/new", productsNewPost);

export { productsRouter };