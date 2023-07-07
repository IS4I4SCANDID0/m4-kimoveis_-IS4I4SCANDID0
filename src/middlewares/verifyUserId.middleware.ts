import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";
import AppError from "../error/AppError";
import { User } from "../entities";

const verifyUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id: number = Number(req.params.id);
  const userId: User | null = await userRepository.findOneBy({ id });

  if (!userId) throw new AppError("User not found", 404);

  res.locals = { ...res.locals, userId };

  return next();
};

export { verifyUserId };