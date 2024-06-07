import { FreshContext, Handlers } from "$fresh/src/server/types.ts";

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext) => {
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
