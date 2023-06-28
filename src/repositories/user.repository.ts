import { AppDataSource } from "../data-source";
import User from "../entities/users.entity";
import { TUserRepo } from "../interfaces/user.interfaces";

const userRepository: TUserRepo =  AppDataSource.getRepository(User) ;

export { userRepository }