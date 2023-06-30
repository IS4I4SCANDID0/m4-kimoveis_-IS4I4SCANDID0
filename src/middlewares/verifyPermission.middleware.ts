import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";

const verifyIsAdminOrOwner = (req: Request, res: Response, next: NextFunction): void => {
  const { admin, sub } = res.locals.decoded;
  const { id } = req.params;

  if (admin) return next();

  if (Number(sub) !== Number(id)) {
    throw new AppError("Insufficient permissions", 403);
  }
  return next();
};

export { verifyIsAdminOrOwner }