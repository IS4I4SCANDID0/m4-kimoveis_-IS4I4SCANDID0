import { Request, Response } from "express";
import Schedule from "../entities/schedules.entity";
import { TSchedule } from "../interfaces/shedules.interfaces";
import { createSchedule } from "../services/schedules.services";

const createScheduleController = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = res.locals.decoded
  
  const schedule: { message: string } = await createSchedule(req.body, userId);
  return res.status(201).json(schedule);
}

export { createScheduleController }