import { realEstateRepo } from "../data-source";
import { sRealEstateResArray } from "../schemas/realEstate.schemas";

const realEstateServices = {
  getAllWithRelations: async () => {
    const realEstates = await realEstateRepo
      .createQueryBuilder("real_estate")
      .leftJoinAndSelect("real_estate.address", "address")
      .getMany();

    const validRealEstates = sRealEstateResArray.parse(realEstates);
    return validRealEstates;
  },
  getAllSchedules: async (id: number) => {
    const realEstate = await realEstateRepo
      .createQueryBuilder("realEstates")
      .leftJoinAndSelect("realEstates.schedules", "schedule")
      .leftJoinAndSelect("schedule.user", "users")
      .leftJoinAndSelect("realEstates.address", "address")
      .leftJoinAndSelect("realEstates.category", "category")
      .where("realEstates.id = :id", { id })
      .getOne();

    return realEstate;
  },
};

export default realEstateServices;
