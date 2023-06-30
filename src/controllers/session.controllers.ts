import { Request, Response } from "express";
import { TSessionLoginReturn } from "../interfaces/session.interfaces";
import { createLogUser } from "../services/session.services";

const sessionLogUserController = async (req: Request,  res: Response): Promise<Response> => {
  const token: TSessionLoginReturn = await createLogUser(req.body);
  return res.status(201).json(token)
};

export { sessionLogUserController }