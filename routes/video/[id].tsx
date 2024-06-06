import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios"
import Favourites from "../../islands/Favourites.tsx";

type VideoType = {
    title: string,
    thumbnail: string,
    description: string,
    duration: number,
    youtubeid: string,
    date: string,
    id: string,
    fav: boolean
}

type DataType = {
    data : VideoType,
    user_id: string
}

type State = {
  id: string;
  name: string;
  email: string;
}

  
export const handler: Handlers<DataType, State> = {
    GET : async (_req : Request, ctx : FreshContext<State, DataType>) => {
        const mi_id = ctx.params.id 
        const {data} = await axios.get(`https://videoapp-api.deno.dev/video/${ctx.state.id}/${mi_id}`)
        return ctx.render({data: data, user_id: ctx.state.id});
    }
};


const SingleVideo = (props : PageProps<DataType>) => {
  const {data, user_id} = props.data
  return (
    <>
      <div class="video-detail-container">
        <a href="/videos" class="back-button">← Go Back to List</a>
        <div class="video-frame">
        <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${data.youtubeid}`} 
          title={data.description} frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
        </div>
        <h2 class="video-detail-title">{data.title}</h2>
        <p class="video-detail-description">{data.description}</p>
      <Favourites id={data.id}  fav={data.fav} user_id={user_id}></Favourites>
      </div>
    </>
  )
}

export default SingleVideo