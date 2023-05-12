import "dotenv/config";
import { ZodTypeAny } from "zod";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import AppError from "../error";

const validators = {
  bodyIsValid:
    (schema: ZodTypeAny) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      const validatedBody = schema.parse(req.body);
      req.body = validatedBody;
      return next();
    },

  adminStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await validators.token(req, res, () => {});
    if (!res.locals.admin) {
      throw new AppError("Insufficient permission", 403);
    }
    return next();
  },

  token: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authorization: string | undefined = req.headers.authorization;
    if (!authorization) {
      throw new AppError("Missing bearer token", 401);
    }
    const token = authorization.split(" ")[1];
    verify(
      token,
      String(process.env.SECRET_KEY!),
      (error: any, decoded: any): void => {
        if (error as JsonWebTokenError) {
          throw new AppError(error.message, 401);
        }
        res.locals.id = Number(decoded.sub);
        res.locals.admin = decoded.admin;
      }
    );
    return next();
  },
};

export default validators;
