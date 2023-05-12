import { Request, Response } from "express";
import dbServices from "../services/dbshared.services";
import { sCategoryArray, sCategoryRes } from "../schemas/category.schemas";
import { sRealEstateResArray } from "../schemas/realEstate.schemas";
import categoryServices from "../services/category.services";

const entityName = "category";
const schema = sCategoryRes;

const categoryControllers = {
  create: async (req: Request, res: Response) => {
    const data = req.body;
    const newCategory = await dbServices.postData({ entityName, data, schema });
    return res.status(201).json(newCategory);
  },

  listAll: async (req: Request, res: Response) => {
    const allCategories = await dbServices.getAllData({
      entityName,
      schema: sCategoryArray,
    });
    return res.status(200).json(allCategories);
  },

  listRealEstates: async (req: Request, res: Response) => {
    const categoryId = +req.params.id;
    const allRealEstates = await categoryServices.getAllCategoryRelations(
      categoryId
    );
    return res.status(200).json(allRealEstates);
  },
};

export default categoryControllers;
