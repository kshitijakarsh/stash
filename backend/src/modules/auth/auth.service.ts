import { AuthRepo } from "./auth.repository";
import { Hash } from "../../core/hashing";
import { JWT } from "../../core/jwt";

interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export const AuthService = {
  async signup({ name, email, password }: SignupParams) {
    const existing = await AuthRepo.findByEmail(email);
    if (existing) throw new Error("Email already registered.");

    const hashed = await Hash.make(password);

    const result = await AuthRepo.createUser({
      name,
      email,
      password: hashed,
    });

    const user = result[0];
    if (!user) throw new Error("Failed to create user.");

    const token = JWT.sign({ id: user.id });
    return { token, user };
  },

  async login({ email, password }: LoginParams) {
    const user = await AuthRepo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials.");

    const ok = await Hash.verify(password, user.password);
    if (!ok) throw new Error("Invalid credentials.");

    const token = JWT.sign({ id: user.id });
    return { token, user };
  },
};
