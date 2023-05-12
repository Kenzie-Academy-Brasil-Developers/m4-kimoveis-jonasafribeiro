import { z } from "zod";
import { sAddress, sAddressCreateReq } from "./address.schemas";
import { sCategory, sCategoryCreateReq } from "./category.schemas";

const sRealEstate = z.object({
  id: z.number(),
  value: z
    .number()
    .or(
      z
        .string()
        .transform(Number)
        .refine((val) => typeof val === "number" && !isNaN(val) && val >= 0)
    )
    .default(0),
  size: z.number().positive(),
  sold: z
    .boolean()
    .transform(() => false)
    .optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: sAddress.optional(),
  addressId: z.number().positive().optional(),
  category: sCategory.optional(),
  categoryId: z.number().positive().optional(),
});

const sRealEstateCreateReq = sRealEstate
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    addressId: true,
    address: true,
    category: true,
    categoryId: true,
  })
  .extend({
    address: sAddressCreateReq,
    category: sCategoryCreateReq.optional(),
    categoryId: z.number().optional(),
  });

const sRealEstateRes = sRealEstate.extend({
  value: z.string().or(z.number().transform((v) => String(v.toFixed(2)))),
});

const sRealEstateResArray = z.array(sRealEstateRes);

export {
  sRealEstate,
  sRealEstateCreateReq,
  sRealEstateRes,
  sRealEstateResArray,
};
