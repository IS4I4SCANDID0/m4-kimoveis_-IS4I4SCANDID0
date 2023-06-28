import { z } from "zod";

const scheduleSchema = z.object({
  id: z.number().positive(),
  date: z.string(),
  hour: z.date(),
  realState: z.number().positive(),
  userId: z.number().positive()
})

const scheduleCreate = z.object({
  date: z.string(),
  hour: z.date()
})