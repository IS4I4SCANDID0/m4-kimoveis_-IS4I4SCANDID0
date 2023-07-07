import { Category } from "../entities";
import { TCategories, TCategoriesCreate, TCategoriesRead } from "../interfaces/categories.interfaces";
import { categoryRepository } from "../repositories/category.repository";
import { categoriesReadSchema, categoriesSchema } from "../schemas/categories.schema";

const createCategory = async (payload: TCategoriesCreate): Promise<TCategories> => {
  const category: Category = categoryRepository.create(payload);
  await categoryRepository.save(category);

  return categoriesSchema.parse(category);
};

const readCategories = async (): Promise<TCategoriesRead> => {
  return categoriesReadSchema.parse(await categoryRepository.find()) 
}

const readCategoriesOfRealEstate = async (id: string): Promise<Category | null> => {
  const category: Category | null = await categoryRepository.findOne({ where: { id: Number(id) } , relations: { realEstate: true } });
  return category
}

export { createCategory, readCategories, readCategoriesOfRealEstate }