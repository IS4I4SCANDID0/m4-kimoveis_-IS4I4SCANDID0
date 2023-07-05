import { z } from "zod";

const scheduleSchema = z.object({
  id: z.number().positive(),
  date: z.string(),
  hour: z.string(),
  realStateId: z.number().positive().int(),
  userId: z.number().positive()
});

const scheduleCreateSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().positive()
});

export { scheduleSchema, scheduleCreateSchema }