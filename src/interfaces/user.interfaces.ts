import { z } from "zod";
import { userCreateSchema, userReadSchema, userReturnSchema, userUpdateSchema } from "../schemas/user.schema";
import { DeepPartial, Repository } from "typeorm";
import User from "../entities/users.entity";

type TUserCreate = z.infer<typeof userCreateSchema>;
type TUserRead = z.infer<typeof userReadSchema>;
type TUserReturn = z.infer<typeof userReturnSchema>;
type TUserUpdate = DeepPartial<TUserCreate>;

type TUserRepo = Repository<User>;

export { TUserCreate, TUserRead, TUserReturn, TUserUpdate, TUserRepo }