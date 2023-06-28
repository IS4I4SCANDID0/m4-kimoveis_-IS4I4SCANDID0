import User from "../entities/users.entity";
import { TUserCreate } from "../interfaces/user.interfaces";
import { userRepository } from "../repositories/user.repository";

const createUser = async (payload: TUserCreate): Promise<User> => {
  const user: User = userRepository.create(payload);
  await userRepository.save(user)

  return user;
};

const readUsers = async (): Promise<User[]> => {
  return await userRepository.find();
};

const disableUser = async (user: User): Promise<void> => {
  await userRepository.softRemove(user);
};

export { createUser, readUsers, disableUser }