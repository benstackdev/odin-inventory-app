import { Router } from "express";
import { indexGet } from "../controllers/indexController.js";
import { productsRouter } from "./productsRouter.js";

const indexRouter: Router = Router();

indexRouter.get("/", indexGet);

indexRouter.use("/products", productsRouter);

export default indexRouter;