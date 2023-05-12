import "dotenv/config";
import { sign } from "jsonwebtoken";
import { tUser } from "../interfaces/entities.interfaces";
import dbServices from "./dbshared.services";

const userServices = {
  generateLoginToken: async (email: string): Promise<string> => {
    const foundUser = (await dbServices.getOneDataWhere({
      entityName: "user",
      where: { email },
    })) as tUser;

    const token = sign(
      { admin: foundUser.admin },
      String(process.env.SECRET_KEY!),
      {
        subject: String(foundUser.id),
      }
    );

    return token;
  },
};

export default userServices;
