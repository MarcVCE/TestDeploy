import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";

type State = {
    character : string
}

type DataType = {
    data : string
}

export const handler: Handlers<unknown, State> = {
    GET : async (_req : Request, ctx : FreshContext<State, unknown>) => {
        const mi_id = ctx.params.id
        const {data} = await axios.get(`https://rickandmortyapi.com/api/${ctx.state.character}/${mi_id}`)
        return ctx.render({data: data});
    }
  };

const CharacterID = (props: PageProps<DataType>) => {
  console.log(props.data.data)
  return (
    <div>
    </div>
  )
}

export default CharacterID