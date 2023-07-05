import { NextFunction, Request, Response } from "express"
import { realEstateRepository } from "../repositories/realEstate.repository";
import AppError from "../error/AppError";
import { RealEstate } from "../entities";

const verifyRealEstateId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id: number = Number(req.params.id);
  const realEstateId: RealEstate | null = await realEstateRepository.findOneBy({ id });

  if (!realEstateId) throw new AppError("Property not found", 404);

  res.locals = { ...res.locals, realEstateId };

  return next();
};

export { verifyRealEstateId };