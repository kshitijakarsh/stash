export async function authHandler(req: Request) {
  //   const token = req.headers.get("authorization");
  //   if (!token) return new Response("Unauthorized", { status: 401 });

  return new Response("This response is coming from the authHandler function", {
    status: 200,
  });
}




