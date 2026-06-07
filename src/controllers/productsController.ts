import type { Request, Response } from "express";
import { getAllCategories, getAllProducts, getProductById, postNewProduct } from "../db/queries.js";
import type { CategoryType } from "../types/category.type.js";
import type { ProductType, ProductViewType } from "../types/product.type.js";
import categories from "../utils/categories.js";

const productsAllGet = async (req: Request, res: Response) => {
  try {
    const productsQueryList: ProductType[] = await getAllProducts();
    const productsViewList: ProductViewType[] = productsQueryList.map((product: ProductType): ProductViewType => {
      const name = categories.getNameById(product.categoryid);
      return {
        ...product,
        categoryName: name ?? "undefined"
      };
    });

    res.render("productsAll", {
      title: "All products",
      products: productsViewList
    });
  } catch (error) { throw (error); }
};

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
      categoryid: req.body.category
    };

    await postNewProduct(newProduct);
    res.redirect("/");
  } catch (error) { throw error; }
};

const productsIdGet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductById(String(id));

    res.render("productsId", {
      title: product.name,
      // Not the best type safety here
      product: {
        ...product,
        categoryName: categories.getNameById(product.categoryid)
      }
    });
  } catch (error) { throw error; }
};

export {
  productsAllGet,
  productsNewGet,
  productsIdGet,
  productsNewPost
};