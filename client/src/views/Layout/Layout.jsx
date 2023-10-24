import Button from "../../Components/Button/Button";
import CardContainer from "../../Components/CardContainer/CardContainer";
import Footer from "../../Components/Footer/Footer";
import Home from "../../Components/Home/Home";

import Styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={Styles.layoutContainer}>
      <Home />
      <CardContainer text={"Los mejores cursos"} />
      <CardContainer text={"Categorias"} />
      <CardContainer text={"Últimos cursos"} />
      <CardContainer text={"Novedades"} />
      <Button text={"Ver todos cursos"} />
      <Footer />
    </div>
  );
};

export default Layout;
