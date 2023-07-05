import { z } from "zod";
import { scheduleCreateSchema, scheduleSchema } from "../schemas/shedules.schema";
import { Repository } from "typeorm";
import Schedule from "../entities/schedules.entity";

type TSchedule = z.infer<typeof scheduleSchema>;
type TScheduleCreate = z.infer<typeof scheduleCreateSchema>;

type TScheduleRepo = Repository<Schedule>

export { TSchedule, TScheduleCreate, TScheduleRepo }