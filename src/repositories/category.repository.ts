import { AppDataSource } from "../data-source";
import Category from "../entities/categories.entity";
import { TCategoryRepo } from "../interfaces/categories.interfaces";

const categoryRepository: TCategoryRepo =  AppDataSource.getRepository(Category) ;

export { categoryRepository }