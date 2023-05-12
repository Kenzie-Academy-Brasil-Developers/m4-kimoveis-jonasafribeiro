import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import error from "./middlewares/errorhandle.middlewares";
import loginRouter from "./routes/login.routes";
import usersRouter from "./routes/user.routes";
import categoriesRouter from "./routes/category.routes";
import real_estateRouter from "./routes/realEstate.routes";
import schedulesRouter from "./routes/schedule.routes";

const app: Application = express();
app.use(express.json());

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/realEstate", real_estateRouter);
app.use("/schedules", schedulesRouter);

app.use(error);

export default app;
