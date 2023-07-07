import { z } from "zod";
import { addressesRelationSchema } from "./addresses.schema";

const realEstateSchema = z.object({
  id: z.number().positive(),
  value: z.number().or(z.string()),
  size: z.number().positive().int(),
  address: addressesRelationSchema,
  categoryId: z.number().positive(),
  sold: z.boolean().default(false),
  createdAt: z.string(),    
  updatedAt: z.string(), 
});

const realEstateCreateSchema = realEstateSchema.omit({ 
  id: true, 
  sold: true, 
  createdAt: true, 
  updatedAt: true
})

const realEstatesReadSchema = realEstateSchema.array()

export { realEstateSchema, realEstateCreateSchema, realEstatesReadSchema }