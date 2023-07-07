import { z } from  "zod"
import { Repository } from "typeorm";
import { addressesSchema } from "../schemas/addresses.schema";
import { RealEstate } from "../entities";
import { realEstatesReadSchema } from "../schemas/realEstate.schema";

type TRealEstate = {
  id: number;
  value: number | string
  size: number;
  address: z.infer<typeof addressesSchema>;
  categoryId: number;
  sold: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

type TRealEstateCreate = {
  value: number | string;
  size: number;
  address: z.infer<typeof addressesSchema>;
  categoryId: number;
};

type TRealEstatesRead = z.infer<typeof realEstatesReadSchema>
type TRealEstateRepo = Repository<RealEstate>;

export { TRealEstate, TRealEstateCreate, TRealEstateRepo, TRealEstatesRead }