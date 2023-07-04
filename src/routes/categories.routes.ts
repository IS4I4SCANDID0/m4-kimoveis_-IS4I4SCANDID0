import { Router } from "express";
import { verifyIsAdmin } from "../middlewares/verifyJustAdm";
import { validateBody } from "../middlewares/validateBody.middleware";
import { categoriesCreateSchema } from "../schemas/categories.schema";
import { createCategoryController, readCategoriesOfRealEstateController, readCategoryController } from "../controllers/category.controllers";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyCategoryName } from "../middlewares/verifyCategoryName.middleware";
import { verifyCategoryId } from "../middlewares/verifyCategoryId.middleware";

const categoriesRoutes: Router = Router();

categoriesRoutes.post("", validateBody(categoriesCreateSchema), verifyToken, verifyIsAdmin, verifyCategoryName ,createCategoryController);
categoriesRoutes.get("", readCategoryController)
categoriesRoutes.get("/:id/realEstate", verifyCategoryId, readCategoriesOfRealEstateController)

export { categoriesRoutes }