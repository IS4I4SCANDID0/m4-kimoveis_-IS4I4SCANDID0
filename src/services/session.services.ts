import { compare } from "bcryptjs";
import AppError from "../error/AppError";
import { TSessionLoginCreate, TSessionLoginReturn } from "../interfaces/session.interfaces";
import { userRepository } from "../repositories/user.repository";
import { sign } from "jsonwebtoken";
import { User } from "../entities";

const createLogUser = async ({ email, password }: TSessionLoginCreate): Promise<TSessionLoginReturn> => {
  const foundUser: User | null = await userRepository.findOneBy({ email });
  if(!foundUser) throw new AppError("Invalid credentials", 401);

  const samePass: boolean = await compare(password, foundUser.password);
  if(!samePass) throw new AppError("Invalid credentials", 401); 

  const token: string = sign(
    { admin: foundUser.admin, userId: foundUser.id },
    process.env.SECRET_KEY!,
    { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token }
};

export { createLogUser }