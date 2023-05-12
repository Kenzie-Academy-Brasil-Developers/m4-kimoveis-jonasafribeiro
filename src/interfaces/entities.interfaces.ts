import { z } from "zod";
import {
  sUser,
  sUserRes,
  sUserCreateReq,
  sUserLogin,
  sUserUpdateReq,
} from "../schemas/user.schemas";
import {
  sCategory,
  sCategoryCreateReq,
  sCategoryRes,
} from "../schemas/category.schemas";
import {
  sRealEstate,
  sRealEstateCreateReq,
  sRealEstateRes,
} from "../schemas/realEstate.schemas";
import {
  sAddress,
  sAddressCreateReq,
  sAddressRes,
} from "../schemas/address.schemas";
import {
  sSchedule,
  sScheduleCreateReq,
  sScheduleRes,
} from "../schemas/schedule.schemas";

type tUser = z.infer<typeof sUser>;
type tUserRes = z.infer<typeof sUserRes>;
type tUserCreateReq = z.infer<typeof sUserCreateReq>;
type tUserUpdateReq = z.infer<typeof sUserUpdateReq>;
type tUserLogin = z.infer<typeof sUserLogin>;

type tCategory = z.infer<typeof sCategory>;
type tCategoryRes = z.infer<typeof sCategoryRes>;
type tCategoryCreateReq = z.infer<typeof sCategoryCreateReq>;

type tRealEstate = z.infer<typeof sRealEstate>;
type tRealEstateRes = z.infer<typeof sRealEstateRes>;
type tRealEstateCreateReq = z.infer<typeof sRealEstateCreateReq>;

type tAddress = z.infer<typeof sAddress>;
type tAddressRes = z.infer<typeof sAddressRes>;
type tAddressCreateReq = z.infer<typeof sAddressCreateReq>;

type tSchedule = z.infer<typeof sSchedule>;
type tScheduleRes = z.infer<typeof sScheduleRes>;
type tScheduleCreateReq = z.infer<typeof sScheduleCreateReq>;

export {
  tUser,
  tUserCreateReq,
  tUserUpdateReq,
  tUserLogin,
  tUserRes,
  tCategory,
  tCategoryRes,
  tCategoryCreateReq,
  tRealEstate,
  tRealEstateRes,
  tRealEstateCreateReq,
  tAddress,
  tAddressRes,
  tAddressCreateReq,
  tSchedule,
  tScheduleRes,
  tScheduleCreateReq,
};
