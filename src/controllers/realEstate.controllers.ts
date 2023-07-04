import { Request, Response } from "express";
import { TRealEstate, TRealEstatesRead } from "../interfaces/realEstate.interfaces";
import { createRealEstate, readRealEstates } from "../services/realEstate.services";
import RealEstate from "../entities/real_estate.entity";
import { readCategoriesOfRealEstate } from "../services/categories.services";

const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {
  const realEstate: RealEstate = await createRealEstate(req.body);
  return res.status(201).json(realEstate)
}

const readRealEstatesController = async (req: Request, res: Response): Promise<Response> => {
  const realEstate: RealEstate[] = await readRealEstates();
  return res.status(200).json(realEstate)
}

export { createRealEstateController, readRealEstatesController }