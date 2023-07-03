import { AppDataSource } from "../data-source";
import RealEstate from "../entities/real_estate.entity";
import { TRealEstateRepo } from "../interfaces/realEstate.interfaces";

const realEstateRepository: TRealEstateRepo =  AppDataSource.getRepository(RealEstate) ;

export { realEstateRepository }