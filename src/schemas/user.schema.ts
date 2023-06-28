import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(() => false),
  createdAt: z.date(),
  updatedAt: z.date(),
  deleteAt: z.date().nullable()  
})

const userReturnSchema = userSchema.omit({ password: true });

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deleteAt: true
})

const userUpdateSchema = userCreateSchema.omit({ admin: true }).partial()

const userReadSchema = userReturnSchema.array()

export { userSchema, userReturnSchema, userCreateSchema, userUpdateSchema, userReadSchema }