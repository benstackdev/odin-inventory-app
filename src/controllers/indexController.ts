import type { Request, Response } from "express";

const indexGet = (req: Request, res: Response) => {
  try {
    res.render("index", { title: "Inventory App" });
  } catch (error) {
    throw error;
  }
};

export {
  indexGet
};