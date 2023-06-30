import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware"
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";
import { createUserController, disableUsersController, readUsersController, updateUserController } from "../controllers/user.controllers";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyIsAdminOrOwner } from "../middlewares/verifyPermission.middleware";
import { verifyUserId } from "../middlewares/verifyId.middleware";
import { disableUser } from "../services/user.services";
import { verifyIsAdmin } from "../middlewares/verifyJustAdm";

const userRoutes: Router = Router();

userRoutes.post("", validateBody(userCreateSchema), verifyEmail, createUserController)
userRoutes.get("", verifyToken, verifyIsAdminOrOwner, readUsersController)

userRoutes.use("/:id", verifyUserId)
userRoutes.patch("/:id", validateBody(userUpdateSchema), verifyToken, verifyIsAdminOrOwner, updateUserController)
userRoutes.delete("/:id", verifyToken, verifyIsAdmin, disableUsersController)

export { userRoutes }