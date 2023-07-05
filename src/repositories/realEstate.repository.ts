import { AppDataSource } from "../data-source";
import { RealEstate } from "../entities";

import { TRealEstateRepo } from "../interfaces/realEstate.interfaces";

const realEstateRepository: TRealEstateRepo =  AppDataSource.getRepository(RealEstate) ;

export { realEstateRepository }