import { NextFunction, Request, Response } from "express";
import AppError from "../error";
import dbServices from "../services/dbshared.services";

const realEstateMiddlewares = {
  checkId: async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = Number(req.params.id ?? req.body.id ?? req.body.realEstateId);
    const exists = await dbServices.checkIfExists({
      entityName: "realEstate",
      where: { id },
    });
    if (!exists) {
      throw new AppError("RealEstate not found", 404);
    }
    return next();
  },

  checkAddressNotExists: async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const address = req.body.address;
    const exists = await dbServices.checkIfExists({
      entityName: "address",
      where: address,
    });
    if (exists) {
      throw new AppError("Address already exists", 409);
    }
    return next();
  },
};

export default realEstateMiddlewares;
