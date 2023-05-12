import { Request, Response } from "express";
import dbServices from "../services/dbshared.services";
import { tScheduleCreateReq } from "../interfaces/entities.interfaces";
import realEstateServices from "../services/realEstate.services";

const entityName = "schedule";

const scheduleControllers = {
  schedule: async (req: Request, res: Response) => {
    const data = { ...req.body, userId: res.locals.id } as tScheduleCreateReq;
    await dbServices.postData({ entityName, data });
    return res.status(201).json({ message: "Schedule created" });
  },

  listSchedulesPerRealEstate: async (req: Request, res: Response) => {
    const realEstateId = +req.params.id;
    const schedules = await realEstateServices.getAllSchedules(realEstateId);
    return res.status(200).json(schedules);
  },
};

export default scheduleControllers;
