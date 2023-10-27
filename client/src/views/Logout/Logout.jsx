import style from "./Logout.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return( 
    <div className={style.buttonContainer}>
      <button className={style.cssButtonSharpBlue} onClick={() => logout()}>logout</button>
   </div>
  )
};

export default LogoutButton;