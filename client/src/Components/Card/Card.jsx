import { useNavigate } from "react-router-dom";
import Styles from "./Card.module.css";
import Button from "../Button/Button";

const Card = ({ course }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detailCourse/${course.id}`);
  };

  const generateStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className={Styles.starFilled}></span>);
      } else {
        stars.push(<span key={i} className={Styles.star}></span>);
      }
    }
    return stars;
  };

  return (
    <div className={Styles.cardContainer}>
      <div className={Styles.imgContainer} onClick={handleCardClick}>
        <img src={course.image} />
      </div>
      <div className={Styles.contentContainer}>
        <div className={Styles.contentTop}>
          <div className={Styles.contentTopTitle}>
            <div className={Styles.title}>
              <h2>{course.title}</h2>
              <span>{course.category}</span>
            </div>
            <div className={Styles.contentTopPrice}>US$ {course.price}</div>
          </div>
          <div className={Styles.contentTopText}>
            <p>{course.description}</p>
          </div>
          <div className={Styles.contentTopDetail}>
            <div>Nombre del instructor</div>
            <div>
              4.5 xxxxx (800)
              {course.rating} {generateStars(course.rating)}
            </div>
            <div>30 horas en total - 200 clases</div>
          </div>
        </div>
        <div className={Styles.contentBottom}>
          <div className={Styles.contentBottomButton}>
            <Button text={"Agregar al carrito"} />
            <Button text={"Comprar"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
