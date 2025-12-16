import jwt from "jsonwebtoken";
import { ENV } from "./env";

export const JWT = {
  sign(payload: object) {
    return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: "7d" });
  },

  verify(token: string) {
    return jwt.verify(token, ENV.JWT_SECRET);
  }
};
