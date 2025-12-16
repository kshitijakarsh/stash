import { SignupSchema, LoginSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

export const AuthController = {
  async signup(req: Request) {
    const body = await req.json();
    const data = SignupSchema.parse(body);

    const result = await AuthService.signup(data);
    return Response.json(result);
  },

  async login(req: Request) {
    const body = await req.json();
    const data = LoginSchema.parse(body);

    const result = await AuthService.login(data);
    return Response.json(result);
  }
};
