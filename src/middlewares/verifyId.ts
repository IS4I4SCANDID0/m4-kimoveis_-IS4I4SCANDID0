import { NextFunction, Request, Response } from "express";
import User from "../entities/users.entity";
import { userRepository } from "../repositories/user.repository";
import AppError from "../error/AppError";

const verifyId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id: number = Number(req.params.id)
  const foundId: User | null = await userRepository.findOneBy({ id });

  if(!foundId) throw new AppError("User not Found", 404);

  res.locals = { ...res.locals, foundId };

  return next();
}