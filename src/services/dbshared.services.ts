import { ZodTypeAny } from "zod";
import { getEntityRepoByName } from "./innerShared.services";
import {
  EntityRes,
  tInputEntityCreateData,
  tInputEntityNames,
  tInputEntityUpdateData,
} from "../interfaces/services.interfaces";

const dbServices = {
  getDataById: async <T extends tInputEntityNames, S extends ZodTypeAny>({
    entityName,
    id,
    schema,
  }: {
    entityName: T;
    id: number;
    schema?: S;
  }): Promise<EntityRes<T, S>> => {
    const entityRepo = getEntityRepoByName(entityName);
    const findedData = await entityRepo.findOneBy({
      id,
    });
    if (schema) {
      const validData = schema.parse(findedData);
      return validData;
    }
    return findedData;
  },

  getAllData: async <T extends tInputEntityNames, S extends ZodTypeAny>({
    entityName,
    schema,
  }: {
    entityName: T;
    schema?: S;
  }): Promise<EntityRes<T, S>[] | number> => {
    const entityRepo = getEntityRepoByName(entityName);
    const findedData = await entityRepo.find();
    if (schema) {
      const validData = schema.parse(findedData);
      return validData;
    }
    return findedData;
  },

  postData: async <T extends tInputEntityNames, S extends ZodTypeAny>({
    entityName,
    data,
    schema,
  }: {
    entityName: T;
    data: tInputEntityCreateData;
    schema?: S;
  }): Promise<EntityRes<T, S>> => {
    const entityRepo = getEntityRepoByName(entityName);
    const newEntityData = entityRepo.create(data);
    await entityRepo.save(newEntityData);
    if (schema) {
      const validEntityData = schema.parse(newEntityData);
      return validEntityData;
    }
    return newEntityData;
  },

  updateData: async <T extends tInputEntityNames, S extends ZodTypeAny>({
    entityName,
    id,
    data,
    schema,
  }: {
    entityName: T;
    id: number;
    data: tInputEntityUpdateData;
    schema?: S;
  }): Promise<EntityRes<T, S>> => {
    const entityRepo = getEntityRepoByName(entityName);
    const foundEntity = await dbServices.getDataById({ entityName, id });
    const updateEntity: EntityRes<T, S> = entityRepo.create({
      ...foundEntity,
      ...data,
    });
    await entityRepo.save(updateEntity);
    if (schema) {
      const validEntity = schema.parse(updateEntity);
      return validEntity;
    }
    return updateEntity;
  },

  softDeleteData: async ({
    entityName,
    id,
  }: {
    entityName: tInputEntityNames;
    id: number;
  }): Promise<void> => {
    const entityRepo = getEntityRepoByName(entityName);
    const foundEntity = await dbServices.getDataById({ entityName, id });
    await entityRepo.softRemove(foundEntity);
    return;
  },

  checkIfExists: async ({
    entityName,
    where,
  }: {
    entityName: tInputEntityNames;
    where: Record<string, unknown>;
  }): Promise<boolean> => {
    const entityRepo = getEntityRepoByName(entityName);
    const foundEntCount = await entityRepo.countBy(where);
    return foundEntCount > 0 ? true : false;
  },

  getOneDataWhere: async <T extends tInputEntityNames, S extends ZodTypeAny>({
    entityName,
    where,
    schema,
  }: {
    entityName: T;
    where: Record<string, unknown>;
    schema?: S;
  }): Promise<EntityRes<T, S>> => {
    const entityRepo = getEntityRepoByName(entityName);
    const foundEnt = await entityRepo.findOneBy(where);
    if (schema && foundEnt) {
      const validOutput = schema.parse(foundEnt);
      return validOutput.data;
    }
    return foundEnt;
  },

  getAllDataWhere: async <T extends tInputEntityNames, S extends ZodTypeAny>({
    entityName,
    where,
    schema,
  }: {
    entityName: T;
    where: Record<string, unknown>;
    schema?: S;
  }): Promise<EntityRes<T, S>[]> => {
    const entityRepo = getEntityRepoByName(entityName);
    const allEntities = await entityRepo.findBy(where);
    if (schema) {
      const validOutput = schema.parse(allEntities);
      return validOutput;
    }
    return allEntities;
  },
};

export default dbServices;
