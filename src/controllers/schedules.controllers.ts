import { Request, Response } from "express";
import Schedule from "../entities/schedules.entity";
import { TSchedule, TSchedulesRead } from "../interfaces/shedules.interfaces";
import { createSchedule, readSchedulesOfEstate } from "../services/schedules.services";
import RealEstate from "../entities/real_estate.entity";

const createScheduleController = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = res.locals.decoded
  
  const schedule: { message: string } = await createSchedule(req.body, userId);
  return res.status(201).json(schedule);
}

const readSchedulesOfEstateController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  
  const schedulesOfEstate: RealEstate | null = await readSchedulesOfEstate(Number(id)) 
  return res.status(200).json(schedulesOfEstate)
}

export { createScheduleController, readSchedulesOfEstateController }