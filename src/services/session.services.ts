import { compare } from "bcryptjs";
import User from "../entities/users.entity";
import AppError from "../error/AppError";
import { TSessionLoginCreate, TSessionLoginReturn } from "../interfaces/session.interfaces";
import { userRepository } from "../repositories/user.repository";
import { sign } from "jsonwebtoken";

const createLogUser = async ({ email, password }: TSessionLoginCreate): Promise<TSessionLoginReturn> => {
  const foundUser: User | null = await userRepository.findOneBy({ email });
  if(!foundUser) throw new AppError("Invalid credentials", 401);

  const samePass: boolean = await compare(password, foundUser.password);
  if(!samePass) throw new AppError("Invalid credentials", 401); 

  const token: string = sign(
    { admin: foundUser.admin },
    process.env.SECRET_KEY!,
    { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token }
};

export { createLogUser }