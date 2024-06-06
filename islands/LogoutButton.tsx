
const LogoutButton = () => {
  function limpiarCookie(){
    document.cookie = "auth=;  path=/;";
    window.location.href = "/login";
  }
  return (
    <>
        <a class="logout-button" onClick={() => limpiarCookie()}>Logout</a>
    </>
  )
}

export default LogoutButton