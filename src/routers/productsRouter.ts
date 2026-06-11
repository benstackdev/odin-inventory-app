import { Router } from "express";
import { productsAllGet, productsIdDelete, productsIdGet, productsIdUpdateGet, productsIdUpdatePost, productsNewGet, productsNewPost } from "../controllers/productsController.js";

const productsRouter: Router = Router();

productsRouter.get("/all", productsAllGet);
productsRouter.get("/new", productsNewGet);
productsRouter.get("/:id", productsIdGet);
productsRouter.get("/:id/update", productsIdUpdateGet);
productsRouter.post("/new", productsNewPost);
productsRouter.post("/:id/update", productsIdUpdatePost);
productsRouter.post("/:id/delete", productsIdDelete);

export { productsRouter };