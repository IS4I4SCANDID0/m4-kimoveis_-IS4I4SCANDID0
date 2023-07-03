import { z } from "zod";
import { addressesRelationSchema } from "../schemas/addresses.schema";
import { Repository } from "typeorm";
import Address from "../entities/addresses.entity";

type TAddressesRelation = z.infer<typeof addressesRelationSchema>;
type TAddressRepo = Repository<Address>;

export { TAddressesRelation , TAddressRepo }