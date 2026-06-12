import { body, type ValidationChain } from "express-validator";

const validateStoresNew: ValidationChain[] = [
  body("storeName")
    .trim()
    .isAlpha().withMessage("Store name must only contain letters.")
    .isLength({ min: 3, max: 20 }).withMessage("Store names must be between 3 and 20 letters in length.")
];

export {
  validateStoresNew
};