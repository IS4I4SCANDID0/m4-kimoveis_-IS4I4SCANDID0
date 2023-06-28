import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
  email: z.string().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(() => false),
  createdAt: z.date(),
  updatedAt: z.date(),
  deleteAt: z.date().nullable()  
})

const userReturn = userSchema.omit({ password: true });

const userCreate = z.object({
  name: z.string().max(45),
  email: z.string().max(45),
  password: z.string().max(120),
  admin: z.boolean().optional().default(() => false),
})

const userUpdate = userCreate.omit({ admin: true })

const userRead = userReturn.array()

export { userSchema, userReturn, userCreate, userUpdate, userRead }