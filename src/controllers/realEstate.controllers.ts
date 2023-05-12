import { Request, Response } from "express";
import dbServices from "../services/dbshared.services";
import { sRealEstateRes } from "../schemas/realEstate.schemas";
import { sCategory, sCategoryCreateReq } from "../schemas/category.schemas";
import { sAddressRes } from "../schemas/address.schemas";
import realEstateServices from "../services/realEstate.services";

const entityName = "realEstate";
const schema = sRealEstateRes;

const realEstateControllers = {
  create: async (req: Request, res: Response) => {
    const data = req.body;
    if (data.category) {
      const newCategory = await dbServices.postData({
        entityName: "category",
        data: data.category,
        schema: sCategoryCreateReq,
      });
      data.category = newCategory;
    } else if (data.categoryId) {
      const category = await dbServices.getDataById({
        entityName: "category",
        id: data.categoryId,
        schema: sCategory,
      });
      data.category = category;
      delete data.categoryId;
    }

    const newAddress = await dbServices.postData({
      entityName: "address",
      data: data.address,
      schema: sAddressRes,
    });
    data.address = newAddress;

    let newRealEstate = await dbServices.postData({
      entityName,
      data,
      schema,
    });
    newRealEstate = { ...newRealEstate, ...data };
    return res.status(201).json(newRealEstate);
  },

  listAll: async (_req: Request, res: Response) => {
    const realEstates = await realEstateServices.getAllWithRelations();
    return res.status(200).json(realEstates);
  },
};

export default realEstateControllers;
