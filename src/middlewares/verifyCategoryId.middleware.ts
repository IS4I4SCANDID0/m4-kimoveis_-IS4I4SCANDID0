import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import Category from "../entities/categories.entity";
import { categoryRepository } from "../repositories/category.repository";

const verifyCategoryId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id: number = Number(req.params.id);

  const foundId: Category | null = await categoryRepository.findOneBy({ id });

  if(!foundId) throw new AppError("Category not found", 404);

  res.locals = { ...res.locals, foundId };

  return next();
}

export { verifyCategoryId }