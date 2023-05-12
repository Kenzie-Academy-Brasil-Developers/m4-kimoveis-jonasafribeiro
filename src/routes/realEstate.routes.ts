import { Router } from "express";
import realEstateControllers from "../controllers/realEstate.controllers";
import { sRealEstateCreateReq } from "../schemas/realEstate.schemas";
import validators from "../middlewares/validators.middlewares";
import realEstateMiddlewares from "../middlewares/realEstate.middlewares";

const realEstateRouter: Router = Router();

realEstateRouter.post(
  "",
  validators.adminStatus,
  validators.bodyIsValid(sRealEstateCreateReq),
  realEstateMiddlewares.checkAddressNotExists,
  realEstateControllers.create
);

realEstateRouter.get("", realEstateControllers.listAll);

export default realEstateRouter;
