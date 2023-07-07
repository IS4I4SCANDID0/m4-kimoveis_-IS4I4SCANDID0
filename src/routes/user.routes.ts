import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware"
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";
import { createUserController, disableUsersController, readUsersController, updateUserController } from "../controllers/user.controllers";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyIsAdminOrOwner } from "../middlewares/verifyPermission.middleware";
import { verifyUserId } from "../middlewares/verifyUserId.middleware";
import { verifyIsAdmin } from "../middlewares/verifyJustAdm.middleware";

const userRoutes: Router = Router();

userRoutes.post("", validateBody(userCreateSchema), verifyEmail, createUserController)
userRoutes.get("", verifyToken, verifyIsAdminOrOwner, readUsersController)

userRoutes.use("/:id", verifyUserId)
userRoutes.patch("/:id", validateBody(userUpdateSchema), verifyToken, verifyIsAdminOrOwner, updateUserController)
userRoutes.delete("/:id", verifyToken, verifyIsAdmin, disableUsersController)

export { userRoutes }