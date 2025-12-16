import { AuthController } from "./modules/auth/auth.controller";

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/signup") {
      return AuthController.signup(req);
    }

    if (req.method === "POST" && url.pathname === "/login") {
      return AuthController.login(req);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server running on http://localhost:3000");
