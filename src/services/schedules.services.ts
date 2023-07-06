import { TScheduleCreate } from "../interfaces/shedules.interfaces";
import { schedulesRepository } from "../repositories/schedules.repository";
import AppError from "../error/AppError";
import { userRepository } from "../repositories/user.repository";
import { realEstateRepository } from "../repositories/realEstate.repository";
import { RealEstate, Schedule } from "../entities";

const createSchedule = async (payload: TScheduleCreate, userId: number): Promise<{ message: string }> => {
  const { date, hour, realEstateId } = payload;

  await userRepository.findOne({ where: { id: userId } });
  
  const realEstateExists = await realEstateRepository.findOne({ where: { id: realEstateId } }) 
  if(!realEstateExists) throw new AppError("RealEstate not found", 404);

  const fullDate = new Date(`${date} ${hour}`);
  if (fullDate.getDay() === 0 || fullDate.getDay() === 6) throw new AppError("Invalid date, work days are monday to friday");
  if (fullDate.getHours() < 8 || fullDate.getHours() > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM");
  }
  
  const exitsUserSchedule = await schedulesRepository
    .createQueryBuilder("schedules")
    .where("schedules.userId = :userId", { userId: userId })
    .andWhere("schedules.date = :date", { date: date })
    .andWhere("schedules.hour = :hour", { hour: hour })
    .getOne();
  if (exitsUserSchedule) throw new AppError("User schedule to this real estate at this date and time already exists", 409);

  const realEstateScheduleExists: Schedule | null = await schedulesRepository
    .createQueryBuilder("schedules")
    .where("schedules.realEstateId = :realEstateId", { realEstateId: realEstateId })
    .andWhere("schedules.date = :date", { date: date })
    .andWhere("schedules.hour = :hour", { hour: hour })
    .getOne();
  if (realEstateScheduleExists) throw new AppError("Schedule to this real estate at this date and time already exists", 409);

  const realEstate = await realEstateRepository.findOne({ where: { id: realEstateId } });
  const user = await userRepository.findOne({ where: { id: userId } });

  const newSchedule = schedulesRepository.create({
    ...payload,
    realEstate: realEstate!,
    user: user!,
  });
  await schedulesRepository.save(newSchedule);
 
  return { message: "Schedule created" };
};

const readReaEstateSchedules = async (id: number): Promise<RealEstate | null> => {
  const schedules = await realEstateRepository.findOne({ where: { id: id }, relations: 
    {
      schedules: { user: true }, 
      address: true, 
      category: true
    } 
  });
  return schedules;
};

export { createSchedule, readReaEstateSchedules };