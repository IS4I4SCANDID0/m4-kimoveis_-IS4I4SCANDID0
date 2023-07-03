import{ z } from "zod" 
import { Repository } from "typeorm";
import Category from "../entities/categories.entity";
import { categoriesCreateSchema, categoriesReadSchema, categoriesRelationSchema, categoriesSchema } from "../schemas/categories.schema";

type TCategories = z.infer<typeof categoriesSchema>;
type TCategoriesCreate = z.infer<typeof categoriesCreateSchema>;
type TCategoriesRelation = z.infer<typeof categoriesRelationSchema>
type TCategoriesRead = z.infer<typeof categoriesReadSchema>;

type TCategoryRepo = Repository<Category>;

export { TCategories, TCategoriesCreate, TCategoryRepo, TCategoriesRead, TCategoriesRelation }