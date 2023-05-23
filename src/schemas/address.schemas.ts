import { z } from "zod";

const sAddress = z.object({
  id: z.number(),
  street: z.string().max(45).nonempty(),
  zipCode: z.string().max(8),
  number: z.string().max(7).optional().nullable().catch(null),
  city: z.string().max(20),
  state: z.string().max(2),
});

const sAddressCreateReq = sAddress.omit({
  id: true,
});

const sAddressRes = sAddress;

const sAddressResArray = z.array(sAddressRes);

export { sAddress, sAddressCreateReq, sAddressRes, sAddressResArray };
