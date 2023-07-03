import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import Category from "../entities/categories.entity";
import { categoryRepository } from "../repositories/category.repository";

const verifyCategoryName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const name: string = req.body.name;
  if(!name) return next()

  const foundName: Category | null = await categoryRepository.findOneBy({ name });

  if(foundName) throw new AppError("Name already exists", 409);

  res.locals = { ...res.locals, foundName };

  return next();
}

export { verifyCategoryName }