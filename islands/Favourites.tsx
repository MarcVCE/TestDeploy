import { useSignal } from "@preact/signals";
import axios from "npm:axios"

type FavouriteType = {
  id: string,
  fav: boolean
  user_id: string
}

const Favourites = (props : FavouriteType) => {
  const {id, fav, user_id} = props
  const mi_fav = useSignal(fav)
  async function HandleFavourite(){
    const data = await axios.post(`https://videoapp-api.deno.dev/fav/${user_id}/${id}`)
    if (data.status == 200){
       mi_fav.value = !mi_fav.value
    }
    
  }
  return (
    <>
        <button onClick={() => HandleFavourite()} class="fav-button">
          {mi_fav.value ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>
    </>
  )
}

export default Favourites