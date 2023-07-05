import { NextFunction, Request, Response } from "express";
import RealEstate from "../entities/real_estate.entity";
import { realEstateRepository } from "../repositories/realEstate.repository";
import AppError from "../error/AppError";

const verifyRealEstateId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id: number = Number(req.params.id);
  const realEstateId: RealEstate | null = await realEstateRepository.findOneBy({ id });

  if (!realEstateId) throw new AppError("Property not Found", 404);

  res.locals = { ...res.locals, realEstateId };

  return next();
};

export { verifyRealEstateId };