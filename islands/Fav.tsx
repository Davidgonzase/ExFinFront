import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { user, video } from "../types.ts";

type context = {
  video: video;
  user: user;
};

export const Fav: FunctionComponent<context> = (props) => {
  const [favourite, isfavchg] = useState<boolean>(props.video.fav);
  async function change() {
    const res = await fetch(
      "https://videoapp-api.deno.dev/fav/" + props.user.id + "/" +
        props.video.id,
      {
        headers: {
          "Content-Type": "aplication/json",
        },
        method: "POST",
      },
    );

    if(res.status==200){
        isfavchg(!favourite)
    }
  }
  return <button class="fav-button" onClick={() =>{change()}}>{favourite? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}</button>;
};
