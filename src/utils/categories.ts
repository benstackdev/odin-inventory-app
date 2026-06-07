import { getAllCategories } from "../db/queries.js";
import type { CategoryType } from "../types/category.type.js";

class Categories {
  private _list: CategoryType[];

  public static async init(): Promise<Categories> {
    const categoriesObj = new Categories();
    await categoriesObj.fetchCategories();
    return categoriesObj;
  }

  private constructor() {
    this._list = [];
  }

  private async fetchCategories(): Promise<void> {
    this._list = await getAllCategories();
  }

  public all() {
    return this._list;
  }

  public getNameById(id: CategoryType["id"]) {
    const category = this._list.find(category => category.id === id);

    if (!category) return '';
    return category.name;
  }

  public getIdByName(name: CategoryType["name"]) {
    const category = this._list.find(category => category.name === name);

    if (!category) return '';
    return category.id;
  }
}

const categories = await Categories.init();
export default categories;