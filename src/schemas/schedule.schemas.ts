import { ZodError, ZodIssueCode, z } from "zod";
import { sRealEstate } from "./realEstate.schemas";
import { sUser } from "./user.schemas";
import AppError from "../error";

const sSchedule = z.object({
  id: z.number(),
  date: z.string().refine((v) => {
    const dayOfWeek = new Date(v).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      throw new AppError("Invalid date, work days are monday to friday", 400);
    }
    return true;
  }),
  hour: z.string().refine((v) => {
    const [hours, _minutes] = v.split(":");
    const parsedHours = parseInt(hours, 10);

    if (parsedHours < 8 || parsedHours >= 18) {
      throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    }

    return v;
  }),
  realEstate: sRealEstate.optional(),
  realEstateId: z.number().optional(),
  user: sUser.optional(),
  userId: z.number().optional(),
});

const sScheduleCreateReq = sSchedule
  .omit({
    id: true,
    user: true,
    userId: true,
    realEstate: true,
  })
  .extend({
    userId: z.number().optional(),
    realEstateId: z.number(),
  });

const sScheduleRes = sSchedule.refine((obj) => {
  if (obj.user && obj.userId) {
    delete obj.userId;
  }

  if (obj.realEstate && obj.realEstateId) {
    delete obj.realEstateId;
  }

  return obj;
});

const sSchedulesResArray = z.array(sSchedule);

export { sSchedule, sScheduleCreateReq, sScheduleRes, sSchedulesResArray };
