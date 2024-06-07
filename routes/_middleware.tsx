import { getCookies } from "$std/http/cookie.ts";
import { FreshContext } from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import { user } from "../types.ts";

export async function handler(req: Request, ctx: FreshContext<user>) {
  if (ctx.destination !== "route") {
    return await ctx.next();
  }
  if (ctx.route == "/login" || ctx.route == "/register") {
    return await ctx.next();
  }
  const headers = new Headers();
  const { auth } = getCookies(req.headers);
  if (!auth) {
    headers.set("location", "/login");
    return new Response(null, {
      status: 303,
      headers,
    });
  }

  const verify = jwt.verify(auth, Deno.env.get("SECRET"));
  if (!verify) {
    headers.set("location", "/login");
    return new Response(null, {
      status: 303,
      headers,
    });
  }

  ctx.state.email = verify.email;
  ctx.state.id = verify.id;
  ctx.state.name = verify.name;

  return await ctx.next();
}
