import { Router } from "express";
import scheduleControllers from "../controllers/schedule.controllers";
import realEstateMiddlewares from "../middlewares/realEstate.middlewares";
import { sScheduleCreateReq } from "../schemas/schedule.schemas";
import validators from "../middlewares/validators.middlewares";
import scheduleMiddlewares from "../middlewares/schedule.middlewares";

const scheduleRouter: Router = Router();

scheduleRouter.post(
  "",
  validators.token,
  validators.bodyIsValid(sScheduleCreateReq),
  realEstateMiddlewares.checkId,
  scheduleMiddlewares.scheduleValid,
  scheduleControllers.schedule
);

scheduleRouter.get(
  "/realEstate/:id",
  validators.adminStatus,
  realEstateMiddlewares.checkId,
  scheduleControllers.listSchedulesPerRealEstate
);

export default scheduleRouter;
