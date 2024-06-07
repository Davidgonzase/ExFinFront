import { FunctionComponent } from "preact";
import { user, video } from "../types.ts";
import { Video } from "./video.tsx";

type context = {
  videos: video[],
  user:user
};

export const Videolist: FunctionComponent<context> = (props) => {
  return (
    <div class="video-page-container">
      <h1 class="video-list-title">Curso Deno Fresh</h1>
      <div class="video-list-container">
        {props.videos.map((e) => {
          return <Video video={e} user={props.user}/>;
        })}
      </div>
    </div>
  );
};
