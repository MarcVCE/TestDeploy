import { useState } from "preact/hooks";
import axios from "npm:axios";
import jwt from "npm:jsonwebtoken@^9.0.2";
import { setCookie } from "$std/http/cookie.ts";

const LoginIsland = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  async function handleFormulario(event : Event) {event.preventDefault()
    try{const {data, status} = await axios.post("/api/loginapi",{email, password})
      if (status == 200){window.location.href = "/videos"}
    }catch(error){setError("Error en el password")}}

  return (
    <>
    <div class="login-container">
        <h2>Login</h2>
        {error && <p class="error-message">{error}</p>}
        <form onSubmit={(e) => handleFormulario(e)}>
            <label for="email">Email</label>
            <input type="text" id="email" name="email" value={email} 
                   onChange={(e) => setEmail(e.currentTarget.value)} required></input>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" value={password} 
                   onChange={(e) => setPassword(e.currentTarget.value)} required ></input>
            <button type="submit">Login</button>
            <p class="register-link">Don't have an account? <a href="/register">Register</a></p>
        </form>
    </div>
    </>
  )
}

export default LoginIsland