import { categoryRepo } from "../data-source";

const categoryServices = {
  getAllCategoryRelations: async (categoryId: number) => {
    const category = await categoryRepo
      .createQueryBuilder("category")
      .leftJoinAndMapMany(
        "category.realEstate",
        "category.realEstates",
        "realEstate"
      )
      .where("category.id = :id", { id: categoryId })
      .getOne();

    return category;
  },
};

export default categoryServices;
