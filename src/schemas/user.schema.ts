import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(() => false),
  createdAt: z.string(),//!TROCAR AQUI    
  updatedAt: z.string(),//!TROCAR AQUI
  deletedAt: z.string().nullish() //!TROCAR AQUI
})

const userReturnSchema = userSchema.omit({ password: true });

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
});

const userUpdateSchema = userCreateSchema.partial().omit({ admin: true })

const userReadSchema = userReturnSchema.array()

export { userSchema, userReturnSchema, userCreateSchema, userUpdateSchema, userReadSchema }