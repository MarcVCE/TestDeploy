import { FreshContext, Handlers } from "$fresh/server.ts";
import axios from "npm:axios";
import jwt from "npm:jsonwebtoken@^9.0.2";
import { setCookie } from "$std/http/cookie.ts";

type User = {
    email: string
    password: string
}

export const handler: Handlers<User> = {
    POST: async (req : Request, _ctx: FreshContext) => {
      const url = new URL(req.url);
      const {email, password} = (await req.json()) as User;
      try {
        const {data, status} = await axios.post("https://videoapp-api.deno.dev/checkuser",{email, password})
        const JWT_SECRET = Deno.env.get("JWT_SECRET");
        if (!JWT_SECRET) {
          throw new Error("JWT_SECRET is not set in the environment");
        }
        if (status == 200){
          const token = jwt.sign(
            {email: data.email, id: data.id, name: data.name},
            Deno.env.get("JWT_SECRET"),
            {expiresIn: "24h"}
          );
  
          const headers = new Headers();
  
        // create JWT token and set it as a cookie
        setCookie(headers, {
          name: "auth",
          value: token,
          sameSite: "Lax", // this is important to prevent CSRF attacks
          domain: url.hostname,
          path: "/",
          secure: true,
        });
  
        return new Response(null, {
          status: 200, // "See Other"
          headers,
        });
        }
  
      } catch (error) {
        if (error.response.status == 404) {
          // return new Response(JSON.stringify("Incorrect credentials or user does not exist"));
          throw new Error("Something went wrong.");
        }
      }
      return new Response();
    },
  };