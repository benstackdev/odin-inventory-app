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

export type ProductInventoryType = {
  id: string,
  name: string,
  categoryName: string,
  amount: number;
};