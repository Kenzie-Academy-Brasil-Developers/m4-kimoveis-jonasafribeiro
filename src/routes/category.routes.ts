import { Router } from "express";
import { sCategoryCreateReq } from "../schemas/category.schemas";
import categoryMiddlewares from "../middlewares/category.middlewares";
import categoryControllers from "../controllers/category.controllers";
import validators from "../middlewares/validators.middlewares";

const categoryRouter: Router = Router();

categoryRouter.post(
  "",
  validators.adminStatus,
  validators.bodyIsValid(sCategoryCreateReq),
  categoryMiddlewares.checkName,
  categoryControllers.create
);

categoryRouter.get("", categoryControllers.listAll);

categoryRouter.get(
  "/:id/realEstate",
  categoryMiddlewares.checkId,
  categoryControllers.listRealEstates
);

export default categoryRouter;
