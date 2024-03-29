import { User } from "../entities";
import { TUserCreate, TUserRead, TUserRepo, TUserReturn, TUserUpdate } from "../interfaces/user.interfaces";
import { userRepository } from "../repositories/user.repository";
import { userReadSchema, userReturnSchema } from "../schemas/user.schema";

const createUser = async (payload: TUserCreate): Promise<TUserReturn> => {
  const user: User = userRepository.create(payload);
  await userRepository.save(user)

  return userReturnSchema.parse(user);
};

const readUsers = async (): Promise<TUserRead> => {
  return userReadSchema.parse(await userRepository.find({ withDeleted: true }));
};

const updateUser = async (user: User, payload: TUserUpdate): Promise<TUserReturn> => {
  const updatedUser: User = await userRepository.save({ ...user, ...payload })
  return userReturnSchema.parse(updatedUser)
}

const disableUser = async (user: User): Promise<void> => {
  await userRepository.softRemove(user);
};

export { createUser, readUsers, updateUser, disableUser }