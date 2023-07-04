import { Request, Response } from "express";
import { TCategories, TCategoriesRead } from "../interfaces/categories.interfaces";
import { createCategory, readCategories, readCategoriesOfRealEstate } from "../services/categories.services";
import Category from "../entities/categories.entity";

const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
  const category: TCategories = await createCategory(req.body);
  return res.status(201).json(category);
}

const readCategoryController =  async (req: Request, res: Response): Promise<Response> => {
  const categories: TCategoriesRead = await readCategories();
  return res.status(200).json(categories)
}

const readCategoriesOfRealEstateController = async (req: Request, res: Response): Promise<Response> => {
  const categoryId = req.params.id;
  const categories: Category | null = await readCategoriesOfRealEstate(categoryId);
  return res.status(200).json(categories);
}

export { createCategoryController, readCategoryController, readCategoriesOfRealEstateController }