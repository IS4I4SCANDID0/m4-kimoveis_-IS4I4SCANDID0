import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { sessionLoginSchema } from "../schemas/session.schema";
import { sessionLogUserController } from "../controllers/session.controllers";

const sessionRoutes: Router = Router();

sessionRoutes.post("", validateBody(sessionLoginSchema), sessionLogUserController);

export { sessionRoutes }