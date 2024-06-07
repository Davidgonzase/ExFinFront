import { FreshContext, Handlers, PageProps } from "$fresh/src/server/types.ts";
import { Fav } from "../../islands/Fav.tsx";
import { Logout } from "../../islands/Logout.tsx";
import { user, video } from "../../types.ts";

type context = {
    user:user,
  video: video;
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<user, context>) => {
    const url = Deno.env.get("API_URL");
    const res = await fetch(
      url + "video/" + ctx.state.id + "/" + ctx.params.id,);
    const videosres = await res.json() as video;
    return ctx.render({user:ctx.state,video: videosres });
  },
};

export default function Page(props: PageProps<context>) {
  return (
    <div class="page-container">
      <header class="header-container">
        <div class="header-content">
          <span class="user-name">{props.data.user.name}</span>
          <Logout />
        </div>
      </header>
      <div class="video-detail-container">
        <a href="/videos" class="back-button">← Go Back to List</a>
        <div class="video-frame">
          <iframe
            width="100%"
            height="400px"
            src={"https://www.youtube.com/embed/"+props.data.video.youtubeid}
            title={props.data.video.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen=""
          >
          </iframe>
        </div>
        <h2 class="video-detail-title">{props.data.video.title}</h2>
        <p class="video-detail-description">{props.data.video.description}</p>
        <Fav video={props.data.video} user={props.data.user}/>
      </div>
    </div>
  );
}
