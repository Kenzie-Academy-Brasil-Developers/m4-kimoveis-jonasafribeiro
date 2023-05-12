import { NextFunction, Request, Response } from "express";
import AppError from "../error";
import { tUser } from "../interfaces/entities.interfaces";
import bcryptUtils from "../services/bcrypt.services";
import validators from "./validators.middlewares";
import dbServices from "../services/dbshared.services";

const userMiddlewares = {
  emailNotExists: async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const email: string = req.body.email;
    const exists = await dbServices.checkIfExists({
      entityName: "user",
      where: { email },
    });
    if (exists) {
      throw new AppError("Email already exists", 409);
    }
    return next();
  },

  checkId: async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = +req.params.id ?? +req.body.id;
    const exists = await dbServices.checkIfExists({
      entityName: "user",
      where: { id },
    });

    if (!exists) {
      throw new AppError("User not found", 404);
    }

    return next();
  },

  checkLogin: async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;
    const user = (await dbServices.getOneDataWhere({
      entityName: "user",
      where: { email },
    })) as tUser;
    if (
      !user ||
      !(await bcryptUtils.comparePassword(password, user.password))
    ) {
      throw new AppError("Invalid credentials", 401);
    }
    return next();
  },

  checkEditPermission: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await validators.token(req, res, () => {});

    const idReq = +req.params.id;
    const selfId = +res.locals.id;
    const isAdmin: boolean = res.locals.admin;
    if (!isAdmin && idReq !== selfId) {
      throw new AppError("Insufficient permission", 403);
    }
    return next();
  },
};

export default userMiddlewares;
