import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware"
import { userCreateSchema } from "../schemas/user.schema";
import { createUserController, readUsersController } from "../controllers/user.controllers";
import { verifyEmail } from "../middlewares/verifyEmail.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyIsAdminOrOwner } from "../middlewares/verifyPermission.middleware";
import { verifyUserId } from "../middlewares/verifyId.middleware";
import { disableUser } from "../services/user.services";

const userRoutes: Router = Router();

userRoutes.post("", validateBody(userCreateSchema), verifyEmail, createUserController)
userRoutes.get("", verifyToken, verifyIsAdminOrOwner, readUsersController)

userRoutes.use("/:id", verifyUserId)
// userRoutes.patch("/:id")
userRoutes.delete("/:id", verifyToken, verifyIsAdminOrOwner, disableUser)
// ** LOOP INFINITO NA ROTA DE DELETAR USUÁRIO
export { userRoutes }