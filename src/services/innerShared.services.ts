import { Repository } from "typeorm";
import {
  addressRepo,
  categoryRepo,
  realEstateRepo,
  scheduleRepo,
  userRepo,
} from "../data-source";
import { tInputEntityNames } from "../interfaces/services.interfaces";
import AppError from "../error";

export const getEntityRepoByName = (
  entityName: tInputEntityNames
): Repository<any> => {
  switch (entityName) {
    case "user":
      return userRepo;
    case "address":
      return addressRepo;
    case "category":
      return categoryRepo;
    case "realEstate":
      return realEstateRepo;
    case "schedule":
      return scheduleRepo;
    default:
      throw new AppError(`Entidade ${entityName} não encontrada`, 500);
  }
};
