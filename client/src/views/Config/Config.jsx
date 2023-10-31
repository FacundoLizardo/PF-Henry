import { useLocation } from "react-router-dom";
import Styles from "./Config.module.css";

const Config = () => {
  const { state } = useLocation();
  const userData = state.userData;

  return (
    <div className={Styles.configContainer}>
      <h1>Configuración</h1>
      <div>
        <h5>Usuario n°: {userData.id}</h5>
      </div>
    </div>
  );
};

export default Config;
