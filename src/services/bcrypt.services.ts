import bcrypt from "bcryptjs";

const saltRounds = 10;

const bcryptServices = {
  generateHashPassword: async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },

  comparePassword: async (password: string, hash: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hash);
    return match;
  },
};

export default bcryptServices;
