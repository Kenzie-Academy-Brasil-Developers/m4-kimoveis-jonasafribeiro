import { z } from "zod";

const sUser = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const sUserRes = sUser.omit({
  password: true,
});

const sUserResArray = z.array(sUserRes);

const sUserCreateReq = sUser.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const sUserUpdateReq = sUserCreateReq
  .omit({ admin: true })
  .partial()
  .refine((data) => {
    return Object.keys(data || {}).length > 0;
  });

const sUserLogin = sUserCreateReq.omit({
  name: true,
  admin: true,
});

export {
  sUser,
  sUserCreateReq,
  sUserLogin,
  sUserRes,
  sUserResArray,
  sUserUpdateReq,
};
