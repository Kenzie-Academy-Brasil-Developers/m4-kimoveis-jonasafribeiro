import { NextFunction, Request, Response } from "express";
import AppError from "../error";
import dbServices from "../services/dbshared.services";

const categoryMiddlewares = {
  checkId: async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = +req.params.id ?? +req.body.id;
    const exists = await dbServices.checkIfExists({
      entityName: "category",
      where: { id },
    });
    if (!exists) {
      throw new AppError("Category not found", 404);
    }
    return next();
  },

  checkName: async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const name: string = req.body.name;
    const exists = await dbServices.checkIfExists({
      entityName: "category",
      where: { name },
    });
    if (exists) {
      throw new AppError("Category already exists", 409);
    }
    return next();
  },
};

export default categoryMiddlewares;
