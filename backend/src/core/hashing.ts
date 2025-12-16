import bcrypt from "bcryptjs";

export const Hash = {
  make: (password: string) => bcrypt.hash(password, 12),
  verify: (password: string, hashed: string) => bcrypt.compare(password, hashed)
};
