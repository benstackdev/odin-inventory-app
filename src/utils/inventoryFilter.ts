import type { InventoryType } from "../types/inventory.type.js";
import type { ProductInventoryType, ProductType } from "../types/product.type.js";
import categories from "./categories.js";

export const inventoryFilter = (allProducts: ProductType[], inventory: InventoryType[]) => {
  const inInventory: ProductInventoryType[] = [];
  const notInInventory: ProductInventoryType[] = [];
  allProducts.forEach((product) => {
    const productInventoryItem = {
      id: product.id,
      name: product.name,
      categoryName: categories.getNameById(product.categoryid),
      amount: 0
    } as ProductInventoryType;

    productInventoryItem.amount = productInInventory(product.id, inventory);

    if (productInventoryItem.amount) inInventory.push(productInventoryItem);
    else notInInventory.push(productInventoryItem);
  });

  return { inInventory, notInInventory };
};

const productInInventory = (productId: ProductType["id"], inventory: InventoryType[]): number => {
  for (let item of inventory) {
    if (productId === item.productid) return item.amount;
  }
  return 0;
};