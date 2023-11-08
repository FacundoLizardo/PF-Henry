import Home from "../../Components/Home/Home";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../utils/getAllCourses";
import { getAllCategories } from "../../utils/getAllCategories";
import CardLayoutContainer from "../../Components/CardLayoutContainer/CardLayoutContainer";
import { getOnSaleCourses } from "../../utils/getOnSaleCourses";

import Styles from "./Layout.module.css";

const Layout = ({ updateContextUser }) => {
  const [dataCourses, setDataCourses] = useState([]);
  const [onSaleCourses, setOnSlaeCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllCategories();
      await getAllCourses();
      setOnSlaeCourses(await getOnSaleCourses());
      setDataCourses(JSON.parse(localStorage.getItem("coursesData")));
    };
    fetchData();
    const session = JSON.parse(localStorage.getItem("userOnSession"));
    if (session?.email !== "") {
      updateContextUser(session);
    }
  }, []);

  const dataCoursesByDate = dataCourses.sort((a, b) => {
    const fechaA = new Date(a.createdAt);
    const fechaB = new Date(b.createdAt);
    return fechaB - fechaA;
  });

  const dataCoursesSortedByRating = dataCourses.sort(
    (a, b) => b.rating - a.rating
  );

  const dataCoursesSortedByPurchases = dataCourses.sort(
    (a, b) => b.purchases - a.purchases
  );

  return (
    <div className={Styles.layoutContainer}>
      <Home />
      <div className={Styles.layoutContent}>
        <div className={Styles.layoutContentItem}>
          <h2>¡Ahorra con nuestros cursos!</h2>
          <CardLayoutContainer dataCourses={onSaleCourses} />
        </div>
        <div className={Styles.registroBannerContainer}>
          <h3>
            Comienza a enseñar hoy y aumenta tus ingresos{" "}
            <a href="/login">¡Regístrate ahora!</a>
          </h3>
        </div>
        <h2>Cursos mejor valorados por nuestros alumnos</h2>
        <div className={Styles.layoutContentItem}>
          <CardLayoutContainer dataCourses={dataCoursesSortedByRating} />
        </div>
        <h2>Cursos más comprados</h2>
        <div className={Styles.layoutContentItem}>
          <CardLayoutContainer dataCourses={dataCoursesSortedByPurchases} />
        </div>
        <div className={Styles.registroBannerContainer}>
          <h3>
            Descubre <a href="/courses">nuestros cursos</a> y potencia tu
            aprendizaje
          </h3>
        </div>
        <div className={Styles.layoutContentItem}>
          <h2>Últimos cursos</h2>
          <CardLayoutContainer dataCourses={dataCoursesByDate} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
