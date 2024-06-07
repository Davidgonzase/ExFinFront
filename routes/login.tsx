import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { user } from "../types.ts";
import jwt from "jsonwebtoken";

type context = {
  message: string;
};

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext<context>) => {
    return ctx.render({});
  },
  POST: async (req: Request, ctx: FreshContext<context>) => {
    const form = await req.formData();
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    const api = Deno.env.get("API_URL");
    if (!api || api == "") {
      return ctx.render({ message: "No API_URL found" });
    }

    const res = await fetch(api + "checkuser", {
      headers: {
        "Content-Type": "aplication/json",
      },
      method: "POST",
      body: JSON.stringify({email, password}),
    });

    if (res.status == 200) {
      const data = await res.json() as user;
      const secret = Deno.env.get("SECRET");
      if (!secret || secret == "") {
        return ctx.render({ message: "No SECRET found" });
      }
      const token = jwt.sign(
        {
          email,
          id: data.id,
          name: data.name,
        },
        secret,
        {
          expiresIn: "24h",
        },
      );

      const headers = new Headers();
      const url = new URL(req.url);

      setCookie(headers, {
        name: "auth",
        value: token,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      headers.set("location", "/videos");
      return new Response(null, {
        status: 303,
        headers,
      });
    } else if (res.status == 400 || res.status == 404) {
      return ctx.render({ message: "User not found" });
    } else {
      return ctx.render({ message: "Internal Error" });
    }
  },
};

export default function Page(props: PageProps<context>) {
    const message = props.data.message
  return (
    <div class="login-container">
      <h2>Login</h2>
      <p class="error-message">{message}</p>
      <form method="POST" action="/login">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" required="" />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required="" />
        <button type="submit">Login</button>
        <p class="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}
