import Home from "../../Components/Home/Home";
import { useEffect } from "react";
import { getAllCourses } from "../../utils/getAllCourses";
import { getAllCategories } from "../../utils/getAllCategories";
import { useNavigate } from "react-router-dom";
import img from "../../assets/desarrollo.png";
import Button from "../../Components/Button/Button";
import Styles from "./Layout.module.css";

const Layout = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("./courses/");
  };

  useEffect(() => {
    getAllCourses();
    getAllCategories();
  }, []);

  return (
    <div className={Styles.layoutContainer}>
      <Home />
      <div className={Styles.layoutContent}>
        <h2>Cursos mejor valorados por nuestros alumnos</h2>
        <div className={Styles.enDesarrollo}>
          En desarrollo <img src={img} alt="" />
        </div>
        <h2>Cursos más comprados</h2>
        <div className={Styles.enDesarrollo}>
          En desarrollo <img src={img} alt="" />
        </div>
      </div>
      <div className={Styles.layoutBottom}>
        <Button text={"Ver todos cursos"} onClick={handleNavigate} />
      </div>
    </div>
  );
};

export default Layout;
