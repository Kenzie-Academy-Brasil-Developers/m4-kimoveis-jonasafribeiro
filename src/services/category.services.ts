import { categoryRepo } from "../data-source";

const categoryServices = {
  getAllCategoryRelations: async (categoryId: number) => {
    const category = (await categoryRepo
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.realEstates", "realEstate")
      .where("category.id = :id", { id: categoryId })
      .getOne()) as any;

    category["realEstate"] = category["realEstates"];
    delete category["realEstates"];

    return category;
  },
};

export default categoryServices;
