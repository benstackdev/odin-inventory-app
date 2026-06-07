import { Router } from "express";
import { indexGet } from "../controllers/indexController.js";
import { productsRouter } from "./productsRouter.js";
import storesRouter from "./storesRouter.js";

const indexRouter: Router = Router();

indexRouter.get("/", indexGet);

indexRouter.use("/products", productsRouter);
indexRouter.use("/stores", storesRouter);

export default indexRouter;