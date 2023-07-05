import { z } from "zod";
import { scheduleCreateSchema, scheduleReadSchema, scheduleSchema } from "../schemas/shedules.schema";
import { Repository } from "typeorm";
import { Schedule } from "../entities";


type TSchedule = z.infer<typeof scheduleSchema>;
type TScheduleCreate = z.infer<typeof scheduleCreateSchema>;
type TSchedulesRead = z.infer<typeof scheduleReadSchema>; 

type TScheduleRepo = Repository<Schedule>

export { TSchedule, TScheduleCreate, TScheduleRepo, TSchedulesRead }