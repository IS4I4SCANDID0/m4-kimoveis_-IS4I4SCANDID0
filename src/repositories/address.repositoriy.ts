import { AppDataSource } from "../data-source";
import Address from "../entities/addresses.entity";
import { TAddressRepo } from "../interfaces/addresses.interfaces";

const addressRepository: TAddressRepo =  AppDataSource.getRepository(Address) ;

export { addressRepository }