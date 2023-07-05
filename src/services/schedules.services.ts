import { Request } from "express";

import { TSchedule, TScheduleCreate, TSchedulesRead } from "../interfaces/shedules.interfaces";
import { schedulesRepository } from "../repositories/schedules.repository";
import AppError from "../error/AppError";
import { scheduleSchema } from "../schemas/shedules.schema";
import { userRepository } from "../repositories/user.repository";
import { realEstateRepository } from "../repositories/realEstate.repository";
import { RealEstate, Schedule } from "../entities";


const createSchedule = async (payload: TScheduleCreate, userId: number): Promise<{message: string}> => {
  const { date, hour, realEstateId } = payload;
  console.log(hour)
  const userExists = await userRepository.findOne({ where: { id: userId } })

  const exitsUserSchedule = await schedulesRepository.createQueryBuilder("schedules")
    .where("schedules.userId = :userId", { userId: userId })
    .andWhere("schedules.date = :date", { date: date })
    .andWhere("schedules.hour = :hour", { hour: hour })
    .getOne();
  if(exitsUserSchedule) throw new AppError("Schedule already exists for this user in other estate", 409)

  const realEstateScheduleExists: Schedule | null = await schedulesRepository.createQueryBuilder("schedules")
    .where("schedules.realEstateId = :realEstateId", { realEstateId: realEstateId  })
    .andWhere("schedules.date = :date", { date: date })
    .andWhere("schedules.hour = :hour", { hour: hour })
    .getOne();
  if(realEstateScheduleExists) throw new AppError("Schedule already exists for this estate", 409);

  const selectDate = new Date(date);
  if(selectDate.getDay() === 0 || selectDate.getDay() === 6) throw new AppError("Possible to schedules is only weekdays");

  const selectHour = new Date(`${date}T${hour}`);
  if(selectHour.getHours() < 8 || selectHour.getHours() > 18 || selectHour.getMinutes() !== 0) {
    console.log(selectHour)
    throw new AppError("Possible to schedules is only time 08am to 18pm")
  };
  const realEstate = await realEstateRepository.findOne({ where: { id: realEstateId } })
  const user = await userRepository.findOne({ where: { id: userId } })

  const newSchedule = schedulesRepository.create({
    ...payload,
    realEstate: realEstate!,
    user: user!
  });
  await schedulesRepository.save(newSchedule);
  
  return { message: "Schedule registered successes" };
}

const readSchedulesOfEstate = async (id: number): Promise<RealEstate | null> => {
  const schedules = await realEstateRepository.findOne({ where: { id :id }, relations: { schedules: true }  });
  return schedules;
}

export { createSchedule, readSchedulesOfEstate }