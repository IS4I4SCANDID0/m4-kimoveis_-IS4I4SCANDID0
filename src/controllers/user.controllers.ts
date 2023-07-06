import { Request, Response } from "express";
import { createUser, disableUser, readUsers, updateUser } from "../services/user.services";
import { TUserRead, TUserReturn, TUserUpdate } from "../interfaces/user.interfaces";
import { User } from "../entities";

const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const user: TUserReturn = await createUser(req.body);
  return res.status(201).json(user);
};

const readUsersController = async (req: Request, res: Response): Promise<Response> => {
  const users: TUserRead = await readUsers();
  return res.status(200).json(users);  
};

const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  const payload: TUserUpdate = req.body
  const foundUser: User = res.locals.userId
  
  const user: TUserReturn = await updateUser(foundUser, payload);
  return res.status(200).json(user);  
};

const disableUsersController = async (req: Request, res: Response): Promise<Response> => {
  await disableUser(res.locals.userId);
  return res.status(204).json()
};

export { createUserController, readUsersController, updateUserController, disableUsersController }