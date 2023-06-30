import "dotenv/config"
import { Request, Response, NextFunction } from "express";
import AppError from "../error/AppError";
import { verify } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authorization: string | undefined = req.headers.authorization;
  if(!authorization) throw new AppError("Missing bearer token", 401);

  const [_bearer, token]: Array<string> = authorization.split(" ");
  verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if(err) throw new AppError(err.message, 401)
    res.locals = { 
      ...res.locals,
      decoded
    }
  })
  return next();
};

export { verifyToken }