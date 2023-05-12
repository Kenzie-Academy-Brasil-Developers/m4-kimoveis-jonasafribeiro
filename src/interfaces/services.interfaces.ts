import { ZodTypeAny } from "zod";
import {
  tAddress,
  tAddressCreateReq,
  tCategory,
  tCategoryCreateReq,
  tCategoryRes,
  tRealEstate,
  tRealEstateCreateReq,
  tRealEstateRes,
  tSchedule,
  tScheduleCreateReq,
  tScheduleRes,
  tUser,
  tUserCreateReq,
  tUserRes,
  tUserUpdateReq,
} from "./entities.interfaces";

export type tInputEntityNames =
  | "user"
  | "realEstate"
  | "schedule"
  | "category"
  | "address";

export type tInputEntityCreateData =
  | tUserCreateReq
  | tScheduleCreateReq
  | tRealEstateCreateReq
  | tCategoryCreateReq
  | tAddressCreateReq;

export type tOutputEntityData =
  | tUser
  | tSchedule
  | tRealEstate
  | tCategory
  | tAddress;

export type tOutputEntityValidData = tUserRes;

export type tInputEntityUpdateData = tUserUpdateReq;

export type EntityRes<E, S> = E extends "user"
  ? S extends ZodTypeAny
    ? tUserRes
    : tUser
  : E extends "realEstate"
  ? S extends ZodTypeAny
    ? tRealEstateRes
    : tRealEstate
  : E extends "schedule"
  ? S extends ZodTypeAny
    ? tScheduleRes
    : tSchedule
  : E extends "category"
  ? S extends ZodTypeAny
    ? tCategoryRes
    : tCategory
  : E extends "address"
  ? S extends ZodTypeAny
    ? tCategoryRes
    : tAddress
  : unknown;
