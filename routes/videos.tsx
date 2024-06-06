import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios"
import Favourites from "../islands/Favourites.tsx";

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

type State = {
    id: string;
    name: string;
    email: string;
}

type DataType = {
    data : VideoType[],
    user_id: string
}
  
export const handler: Handlers<DataType, State> = {
    GET : async (_req : Request, ctx : FreshContext<State, DataType>) => {
        const {data} = await axios.get(`https://videoapp-api.deno.dev/videos/${ctx.state.id}`)
        return ctx.render({data: data, user_id: ctx.state.id});
    }
};

  
const videos = (props: PageProps<DataType>) => {
  const {data, user_id} = props.data
  return (
    <>
    <div class="video-page-container">
        <h1 class="video-list-title">Curso Deno Fresh</h1>
        <div class="video-list-container">
            {
            data.map((valor) => { 
                return(
                    <div class="video-item" data-fresh-key={valor.id}>
                        <a href={`/video/${valor.id}`} class="video-link">
                            <img src={valor.thumbnail} alt={valor.title} class="video-thumbnail"></img>
                            <div class="video-info">
                                <h3 class="video-title">{valor.title}</h3>
                                <p class="video-description">{valor.description}</p>
                                <p class="video-release-date">Release date: {valor.date}</p>
                            </div>
                        </a>
                        <Favourites id={valor.id}  fav={valor.fav} user_id={user_id}></Favourites>
                    </div>
                )
            })

            }
        </div>
    </div>
    </>
  )
}

export default videos