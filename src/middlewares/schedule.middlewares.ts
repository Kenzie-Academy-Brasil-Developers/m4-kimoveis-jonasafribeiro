import { NextFunction, Request, Response } from "express";
import { scheduleRepo } from "../data-source";
import AppError from "../error";

const scheduleMiddlewares = {
  scheduleValid: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = res.locals.id;
    const { date, hour, realEstateId } = req.body;

    const userDateValid =
      (await scheduleRepo
        .createQueryBuilder("schedule")
        .leftJoinAndSelect("schedule.user", "user")
        .where("user.id = :userId", { userId })
        .andWhere("schedule.date = :date", { date })
        .andWhere("schedule.hour = :hour", { hour })
        .getCount()) > 0
        ? false
        : true;

    if (!userDateValid) {
      throw new AppError(
        "User schedule to this real estate at this date and time already exists",
        409
      );
    }

    const realEstateDateValid =
      (await scheduleRepo
        .createQueryBuilder("schedule")
        .innerJoinAndSelect("schedule.realEstate", "realEstate")
        .where("realEstate.id = :realEstateId", { realEstateId })
        .andWhere("schedule.date = :date", { date })
        .andWhere("schedule.hour = :hour", { hour })
        .getCount()) > 0
        ? false
        : true;

    if (!realEstateDateValid) {
      throw new AppError(
        "Schedule to this real estate at this date and time already exists",
        409
      );
    }

    return next();
  },
  mountReqData: () => {},
};

export default scheduleMiddlewares;
