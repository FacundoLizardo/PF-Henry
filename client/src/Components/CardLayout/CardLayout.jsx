/* eslint-disable no-empty */
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

import Styles from "./CardLayout.module.css";
import { userContext } from "../../App";
import { useContext } from "react";
import { useCart } from "../../context/CartContext";

const CardLayout = ({ courses }) => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const userData = useContext(userContext);
  const course = courses;
  if (!course) {
    return <div>No hay datos disponibles.</div>;
  }

  const courseAlreadyPurchased = (userData?.Payments || []).find((payment) =>
    (payment.Courses || []).find((elemento) => elemento.id === course.id)
  );

  const handleCardToCourse = () => {
    navigate(`/student/${userData.id}`);
    window.scrollTo({ top: 0 });
  };

  const handleCardClick = () => {
    navigate(`/detailCourse/${course.id}`);
    window.scrollTo({ top: 0 });
  };

  const handleNavigateCart = () => {
    navigate(`/cart/${userData.id}`);
    window.scrollTo({ top: 0 });
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const addToCart = () => {
    let newPrice =
      course.price - (course.price * course.percentageDiscount) / 100;
    let roundedNewPrice = parseFloat(newPrice.toFixed(2));

    let productToAddToCart = {
      id: course.id,
      name: course.title,
      price: roundedNewPrice,
      image: course.image,
      description: course.description,
      category: course.category,
      createdAt: course.createdAt,
      enabled: course.enabled,
      instructorId: course.instructor_id,
      onSale: course.onSale,
      progress: course.progress,
      sections: course.sections,
      updatedAt: course.updatedAt,
      lesson: course.lesson,
      ratings: course.ratings,
    };
    dispatch({ type: "ADD_TO_CART", payload: productToAddToCart });
  };

  const newPrice =
    course.price - (course.price * course.percentageDiscount) / 100;
  const roundedNewPrice = newPrice.toFixed(2);

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

          <div className={Styles.contentBottomPrice}>
            {course.onSale ? (
              <div className={Styles.priceContainer}>
                <div className={Styles.priceWhitOutDiscount}>
                  US${course.price}
                </div>
                <div>US${roundedNewPrice}</div>
              </div>
            ) : (
              <div>US${course.price}</div>
            )}
          </div>
        </div>
        <div className={Styles.contentFooter}>
          {courseAlreadyPurchased ? (
            <Button
              text={"Ir al curso"}
              onClick={() => {
                handleCardToCourse();
              }}
            />
          ) : !userData ? (
            <Button text={"¡Comprar ahora!"} onClick={handleNavigateLogin} />
          ) : (
            <Button
              text={"¡Comprar ahora!"}
              onClick={() => {
                addToCart();
                handleNavigateCart();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
