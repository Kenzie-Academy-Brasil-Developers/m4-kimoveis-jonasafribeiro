import { z } from "zod";

const sCategory = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const sCategoryCreateReq = sCategory.omit({
  id: true,
});

const sCategoryRes = sCategory;

const sCategoryArray = z.array(sCategoryRes);

export { sCategory, sCategoryCreateReq, sCategoryRes, sCategoryArray };
