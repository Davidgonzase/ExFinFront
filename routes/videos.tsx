import { FreshContext, Handlers, PageProps } from "$fresh/src/server/types.ts";
import { Videolist } from "../components/videolist.tsx";
import { Logout } from "../islands/Logout.tsx";
import { user, video } from "../types.ts";

type context = {
    user:user,
    videos:video[]
}

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<user,context>) => {
    const url = Deno.env.get("API_URL")
    const res = await fetch(url+"videos/"+ctx.state.id)
    const videosres = await res.json() as video[]
    return ctx.render({user:{email:ctx.state.email,name:ctx.state.name,id:ctx.state.id},videos:videosres});
  },
};

export default function Page(props: PageProps<context>) {

  return (
    <div class="page-container">
      <header class="header-container">
        <div class="header-content">
          <span class="user-name">{props.data.user.name}</span>
          <Logout/>
        </div>
      </header>
      <Videolist videos={props.data.videos} user={props.data.user}/>
    </div>
  );
}
