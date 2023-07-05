import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { scheduleCreateSchema } from "../schemas/shedules.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyIsAdminOrOwner } from "../middlewares/verifyPermission.middleware";
import { createScheduleController } from "../controllers/shedules.controllers";

const schedulesRoutes: Router = Router();

schedulesRoutes.post("", validateBody(scheduleCreateSchema), verifyToken, createScheduleController);

export { schedulesRoutes }