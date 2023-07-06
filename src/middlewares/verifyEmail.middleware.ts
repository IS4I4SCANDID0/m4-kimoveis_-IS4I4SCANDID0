import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";
import AppError from "../error/AppError";
import { User } from "../entities";

const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const email: string = req.body.email;
  if(!email) return next()

  const foundEmail: User | null = await userRepository.findOneBy({ email });

  if(foundEmail) throw new AppError("Email already exists", 409);

  res.locals = { ...res.locals, foundEmail };

  return next();
}

export { verifyEmail }