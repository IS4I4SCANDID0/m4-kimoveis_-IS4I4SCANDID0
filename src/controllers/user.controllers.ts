import { Request, Response } from "express";
import User from "../entities/users.entity";
import { createUser, disableUser, readUsers } from "../services/user.services";

const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const user: User = await createUser(req.body);
  return res.status(201).json(user);
};

const readUsersController = async (req: Request, res: Response): Promise<Response> => {
  const users: User[] = await readUsers();
  return res.status(200).json(users);  
};

const disableUsersController = async (req: Request, res: Response): Promise<Response> => {
  await disableUser(res.locals.foundId);
  return res.status(204).json()
};

export { createUserController, readUsersController, disableUsersController }