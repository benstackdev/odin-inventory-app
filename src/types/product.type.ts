export type ProductType = {
  id: string,
  name: string,
  description: string,
  categoryid: string;
};

// Same as ProductType but with the category name instead of id
export type ProductViewType = {
  id: string,
  name: string,
  description: string,
  categoryName: string;
};

export type ProductInventoryType = ProductType & { amount: number; };