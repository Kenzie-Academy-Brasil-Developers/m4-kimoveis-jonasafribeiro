import { Request, Response } from "express";
import userServices from "../services/user.services";
import dbServices from "../services/dbshared.services";
import { sUserRes, sUserResArray } from "../schemas/user.schemas";

const entityName = "user";
const schema = sUserRes;
const schemaArray = sUserResArray;

const userControllers = {
  register: async (req: Request, res: Response) => {
    const data = req.body;
    const result = await dbServices.postData({
      entityName,
      data,
      schema,
    });
    return res.status(201).json(result);
  },

  login: async (req: Request, res: Response) => {
    const email = req.body.email;
    const token = await userServices.generateLoginToken(email);
    return res.status(200).json({ token });
  },

  listAll: async (_req: Request, res: Response) => {
    const users = await dbServices.getAllData({
      entityName,
      schema: schemaArray,
    });
    return res.status(200).json(users);
  },

  patch: async (req: Request, res: Response) => {
    const id = +req.params.id;
    const data = req.body;
    const updatedUser = await dbServices.updateData({
      entityName,
      data,
      id,
      schema,
    });
    return res.status(200).json(updatedUser);
  },

  delete: async (req: Request, res: Response) => {
    const id = +req.params.id;
    await dbServices.softDeleteData({ entityName, id });
    return res.status(204).send();
  },
};

export default userControllers;
