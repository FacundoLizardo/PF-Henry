/* eslint-disable no-empty */
import { useNavigate } from "react-router-dom";
import Styles from "./Card.module.css";
import Button from "../Button/Button";
import { useCart } from "../../context/CartContext";
import { userContext } from "../../App";
import { useContext } from "react";

const Card = ({ course }) => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const userData = useContext(userContext);

  const handleCardClick = () => {
    navigate(`/detailCourse/${course.id}`);
  };

  const handleNavigateCart = () => {
    navigate(`/cart/${userData.id}`);
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const productToAddToCart = {
    id: course.id,
    name: course.title,
    price: course.price,
    image: course.image,
    description: course.description,
  };

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: productToAddToCart });
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

  const newPrice =
    course.price - (course.price * course.percentageDiscount) / 100;
  const roundedNewPrice = newPrice.toFixed(2);

  return (
    <div className={Styles.cardContainer}>
      <div className={Styles.imgContainer} onClick={handleCardClick}>
        <img src={course.image} alt={course.title} />
      </div>
      <div className={Styles.contentContainer}>
        <div className={Styles.contentTop}>
          <div className={Styles.contentTopTitle}>
            <div className={Styles.title}>
              <h2>{course.title}</h2>
              <span>{course.category}</span>
            </div>
            <div className={Styles.contentTopPrice}>
              {course.onSale ? (
                <>
                  <span className={Styles.priceWhitOutDiscount}>
                    US${course.price}
                  </span>
                  <span>US${roundedNewPrice}</span>
                </>
              ) : (
                <div>US${course.price}</div>
              )}
            </div>
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
            <Button text={"Agregar al carrito"} onClick={addToCart} />
            {!userData ? (
              <Button
                text={"Comprar"}
                onClick={() => {
                  handleNavigateLogin();
                }}
              />
            ) : (
              <Button
                text={"Comprar"}
                onClick={() => {
                  addToCart();

                  if (
                    userData &&
                    userData.Courses &&
                    userData.Courses.find(
                      (userCourse) => userCourse.id === course.id
                    )
                  ) {
                  } else {
                    handleNavigateCart();
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
