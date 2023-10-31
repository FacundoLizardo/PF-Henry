import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

import Styles from "./CardLayout.module.css";

const CardLayout = ({ courses }) => {
  const navigate = useNavigate();
  const course = courses;
  if (!course) {
    return <div>No hay datos disponibles.</div>;
  }

  const handleCardClick = () => {
    navigate(`/detailCourse/${course.id}`);
  };

  return (
    <div className={Styles.cardContainer}>
      <div className={Styles.imgContainer} onClick={handleCardClick}>
        <img src={course.image} />
      </div>
      <div className={Styles.contentContainer}>
        <div className={Styles.contentTop}>
          <h4>{course.title}</h4>
        </div>
        <div className={Styles.contentBottom}>
          <p>{course.description}</p>
          <div className={Styles.contentBottomPrice}>US$ {course.price}</div>
        </div>
        <div className={Styles.contentFooter}>
          <Button text={"¡Comprar ahora!"} />
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
