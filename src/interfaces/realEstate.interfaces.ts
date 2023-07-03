import { z } from  "zod"
import { Repository } from "typeorm";
import RealEstate from "../entities/real_estate.entity";
import { decimalValueSchema, realEstateCreateSchema, realEstateSchema, realEstatesReadSchema } from "../schemas/realEstate.schema";
import { addressesSchema } from "../schemas/addresses.schema";

type TRealEstate = {
  id: number;
  value: z.infer<typeof decimalValueSchema>;
  size: number;
  address: z.infer<typeof addressesSchema>;
  categoryId: number;
  sold: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

type TRealEstateCreate = {
  value: z.infer<typeof decimalValueSchema> | number;
  size: number;
  address: z.infer<typeof addressesSchema>;
  categoryId: number;
};

type TRealEstatesRead = z.infer<typeof realEstatesReadSchema>
type TRealEstateRepo = Repository<RealEstate>;

export { TRealEstate, TRealEstateCreate, TRealEstateRepo, TRealEstatesRead }