import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/user.schema";
import { createUserController } from "../controllers/user.controllers";

const userRoutes: Router = Router();

userRoutes.post("", validateBody(userCreateSchema), createUserController)
// userRoutes.post("")
// userRoutes.post("")

export { userRoutes }