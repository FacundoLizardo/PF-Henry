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
  console.log(dataCourses);

  const checkDisabled = () => {
    const storedData = localStorage.getItem("coursesData");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    const withoutDisabled = parsedData.filter((element) => element.enabled);
    setDataCourses(withoutDisabled);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllCategories();
      await getAllCourses();
      setOnSlaeCourses(await getOnSaleCourses());
    };
    checkDisabled();
    fetchData();
    const session = JSON.parse(localStorage.getItem("userOnSession"));
    if (session?.email !== "") {
      updateContextUser(session);
    }
  }, []);

  const dataCoursesByDate = dataCourses.slice().sort((a, b) => {
    const fechaA = new Date(a.createdAt);
    const fechaB = new Date(b.createdAt);
    return fechaB - fechaA;
  });

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return sum / ratings.length;
  };

  const dataCoursesSortedByRating = dataCourses.slice().sort((a, b) => {
    const averageRatingA = calculateAverageRating(a.ratings);
    const averageRatingB = calculateAverageRating(b.ratings);
    return averageRatingB - averageRatingA;
  });

  const dataCoursesByPrice = dataCourses
    .slice()
    .sort((a, b) => a.price - b.price);

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
        <h2>Encuentra los cursos con mejores precios</h2>
        <div className={Styles.layoutContentItem}>
          <CardLayoutContainer dataCourses={dataCoursesByPrice} />
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
