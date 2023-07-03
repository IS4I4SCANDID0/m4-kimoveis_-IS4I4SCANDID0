import { Router } from "express";
import { verifyIsAdmin } from "../middlewares/verifyJustAdm";
import { validateBody } from "../middlewares/validateBody.middleware";
import { realEstateCreateSchema } from "../schemas/realEstate.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { createRealEstateController, readRealEstatesController } from "../controllers/realEstate.controllers";

const realEstateRoutes: Router = Router();

realEstateRoutes.post("", validateBody(realEstateCreateSchema), verifyToken, verifyIsAdmin, createRealEstateController);
realEstateRoutes.get("", readRealEstatesController);

export { realEstateRoutes }