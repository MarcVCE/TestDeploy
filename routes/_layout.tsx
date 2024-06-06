import { FreshContext} from "$fresh/server.ts";
import LogoutButton from "../islands/LogoutButton.tsx"

type State = {
  id: string;
  name: string;
  email: string;
}


export default async function Layout(req: Request, ctx: FreshContext<State,unknown>) {
  // do something with state here
  return (
    <>
    <div class="page-container">
      <header class="header-container">
            <div class="header-content">
                <span class="user-name">{ctx.state.name}</span>
                <LogoutButton></LogoutButton>
            </div>
      </header>
      <ctx.Component/>
    </div>
    </>
  );
}