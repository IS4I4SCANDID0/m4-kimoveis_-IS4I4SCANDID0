import AppError from "../error/AppError";
import { TRealEstateCreate, TRealEstatesRead } from "../interfaces/realEstate.interfaces";
import { addressRepository } from "../repositories/address.repositoriy";
import { realEstateRepository } from "../repositories/realEstate.repository";

import { categoryRepository } from "../repositories/category.repository";

import { DeepPartial } from "typeorm";
import { TCategories } from "../interfaces/categories.interfaces";
import { userReadSchema } from "../schemas/user.schema";
import { realEstatesReadSchema } from "../schemas/realEstate.schema";
import { Category, RealEstate } from "../entities";

const createRealEstate = async (payload: TRealEstateCreate): Promise<RealEstate> => {
  const { address: addressData, categoryId, ...realEstateData } = payload;
  
  const existingAddress = await addressRepository.createQueryBuilder("address")
    .where("address.street = :street", { street: addressData.street })
    .andWhere("address.zipCode = :zipCode", { zipCode: addressData.zipCode })
    .andWhere("address.city = :city", { city: addressData.city })
    .andWhere("address.state = :state", { state: addressData.state })
    .andWhere("address.number = :number", { number: addressData.number })
    .getOne();
  if(existingAddress) throw new AppError("Address already exists", 409)
  

  const newAddress = addressRepository.create(addressData);
  await addressRepository.save(newAddress)

  const id: number = payload.categoryId;

  const foundId: Category | null = await categoryRepository.findOneBy({ id });

  if(!foundId) throw new AppError("Category not found", 404);

  const category: TCategories | null = await categoryRepository.findOne({ where: { id } }) 

  const realEstate = realEstateRepository.create({
    ...realEstateData,
    address: newAddress,
    category: category
  } as DeepPartial<RealEstate>);

  const realEstateCreated = await realEstateRepository.save(realEstate)
  return realEstateCreated;
};

const readRealEstates = async (): Promise<RealEstate[]> => {
  const realEstate = await realEstateRepository.find({ relations: { address: true } })
  return realEstate;
}

export { createRealEstate, readRealEstates }

// return userReturnSchema.parse({ ...user, createdAt: new Date(user.createdAt), updatedAt: new Date(user.updatedAt) });
// *** /=> SE FOR USAR O RETORNO COMENTADO COM A INSTÂNCIA DE DATE TROCAR PARA string no schema de user