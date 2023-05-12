import { Router } from "express";
import userMiddlewares from "../middlewares/user.middlewares";
import userControllers from "../controllers/user.controllers";
import { sUserLogin } from "../schemas/user.schemas";
import validators from "../middlewares/validators.middlewares";

const loginRouter: Router = Router();

loginRouter.post(
  "",
  validators.bodyIsValid(sUserLogin),
  userMiddlewares.checkLogin,
  userControllers.login
);

export default loginRouter;
