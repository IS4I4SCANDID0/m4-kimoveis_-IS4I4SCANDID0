import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { scheduleCreateSchema } from "../schemas/shedules.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { createScheduleController, readReaEstateSchedulesController,  } from "../controllers/schedules.controllers";
import { verifyIsAdmin } from "../middlewares/verifyJustAdm.middleware";
import { verifyRealEstateId } from "../middlewares/verifyRealEstateId.middleware";

const schedulesRoutes: Router = Router();

schedulesRoutes.post("", verifyToken, validateBody(scheduleCreateSchema), createScheduleController);
schedulesRoutes.get("/realEstate/:id", verifyToken, verifyIsAdmin, verifyRealEstateId, readReaEstateSchedulesController);

export { schedulesRoutes }