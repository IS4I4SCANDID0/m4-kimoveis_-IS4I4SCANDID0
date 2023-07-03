import { z } from "zod";
import { addressesRelationSchema } from "./addresses.schema";

const decimalValueSchema = z.union([z.string(),z.number()])
.refine((val) => {
  const stringValue = val.toString();
  const decPlaces = stringValue.split(".")[1] || "";
  return decPlaces.length <= 1;
}, "The number must have a maximum of one decimal place")
.default("0")

const realEstateSchema = z.object({
  id: z.number().positive(),
  value: decimalValueSchema,
  size: z.number().positive().int(),
  address: addressesRelationSchema,
  categoryId: z.number().positive(),
  sold: z.boolean().default(() => false),
  createdAt: z.string(),//!TROCAR AQUI    
  updatedAt: z.string(),//!TROCAR AQUI 
});

const realEstateCreateSchema = realEstateSchema.omit({ 
  id: true, 
  sold: true, 
  createdAt: true, 
  updatedAt: true
})

const realEstatesReadSchema = realEstateSchema.array()

export { realEstateSchema, realEstateCreateSchema, decimalValueSchema, realEstatesReadSchema }