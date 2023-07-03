import  { z } from "zod";

const categoriesSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45)
});

const categoriesCreateSchema = categoriesSchema.omit({ id: true });
const categoriesRelationSchema = categoriesSchema.omit({ name: true });
const categoriesReadSchema = categoriesSchema.array();

export { categoriesSchema, categoriesCreateSchema, categoriesReadSchema, categoriesRelationSchema }