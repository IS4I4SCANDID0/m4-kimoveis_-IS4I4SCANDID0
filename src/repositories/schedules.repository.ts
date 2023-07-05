import { AppDataSource } from "../data-source";
import Schedule from "../entities/schedules.entity";
import { TScheduleRepo } from "../interfaces/shedules.interfaces";

const schedulesRepository: TScheduleRepo =  AppDataSource.getRepository(Schedule) ;

export { schedulesRepository }