import type { Request, Response } from "express";
import { getAllCategories, postNewProduct } from "../db/queries.js";
import type { CategoryType } from "../types/category.type.js";
import type { ProductType } from "../types/product.type.js";
import categories from "../utils/categories.js";

const productsNewGet = async (req: Request, res: Response) => {
  const categoryList: CategoryType[] = categories.all();
  res.render("productsNew", {
    title: "Create new product",
    categories: categoryList
  });
};

const productsNewPost = async (req: Request, res: Response) => {
  try {
    const newProduct: ProductType = {
      id: crypto.randomUUID(),
      name: req.body.productName,
      description: req.body.productDescription,
      categoryId: req.body.category
    };

    await postNewProduct(newProduct);
    res.redirect("/");
  } catch (error) { throw error; }
};

export {
  productsNewGet,
  productsNewPost
};