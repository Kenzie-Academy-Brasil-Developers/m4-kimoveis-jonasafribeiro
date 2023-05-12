import { Router } from "express";
import userMiddlewares from "../middlewares/user.middlewares";
import userControllers from "../controllers/user.controllers";
import { sUserCreateReq, sUserUpdateReq } from "../schemas/user.schemas";
import validators from "../middlewares/validators.middlewares";

const userRouter: Router = Router();

userRouter.post(
  "",
  validators.bodyIsValid(sUserCreateReq),
  userMiddlewares.emailNotExists,
  userControllers.register
);

userRouter.get("", validators.adminStatus, userControllers.listAll);

userRouter.patch(
  "/:id",
  validators.bodyIsValid(sUserUpdateReq),
  userMiddlewares.checkId,
  userMiddlewares.checkEditPermission,
  userControllers.patch
);

userRouter.delete(
  "/:id",
  userMiddlewares.checkId,
  validators.adminStatus,
  userControllers.delete
);

export default userRouter;
