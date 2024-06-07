import { FunctionComponent } from "preact";
import { user, video } from "../types.ts";
import { Fav } from "../islands/Fav.tsx";

type context = {
    video:video,
    user:user
}

export const Video: FunctionComponent<context> = (props) => {
  return (
    <div class="video-item" data-fresh-key={props.video.id}>
      <a href={"/video/"+props.video.id} class="video-link">
        <img
          src={props.video.thumbnail}
          alt={props.video.title}
          class="video-thumbnail"
        />
        <div class="video-info">
          <h3 class="video-title">{props.video.title}</h3>
          <p class="video-description">{props.video.description}</p>
          <p class="video-release-date">{props.video.date}</p>
        </div>
      </a>
      <Fav video={props.video} user={props.user}/>
    </div>
  );
}
