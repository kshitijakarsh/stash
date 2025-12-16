import { authHandler } from "../middleware/auth";

export const authRoutes = {
  "/auth/login": authHandler, 

  "/auth/register": () => {
    return new Response("Register route", { status: 200 });
  },

  "/auth/logout": () => {
    return new Response("Logged out", { status: 200 });
  },
};
