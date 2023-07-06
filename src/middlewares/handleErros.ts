import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../error/AppError";

const handleErrors = (error: unknown, req: Request, res: Response, nest: NextFunction): Response => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({ message :error.message })
  };

  if(error instanceof ZodError) {
    console.log(error.flatten().fieldErrors)
    return res.status(400).json({ message: error.flatten().fieldErrors })
  };
  console.error(error);
  return res.status(500).json({ message: "Internal server error" }) 
};

export { handleErrors }