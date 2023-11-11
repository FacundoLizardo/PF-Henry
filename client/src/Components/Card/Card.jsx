/* eslint-disable no-empty */
import { useNavigate } from "react-router-dom";
import Styles from "./Card.module.css";
import Button from "../Button/Button";
import { useCart } from "../../context/CartContext";
import { userContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { getUserById } from "../../utils/getUserById";

const formatTimeWithHours = (seconds) => {
  const hours = String(Math.floor(seconds / 3600));
  const minutes = String(Math.floor((seconds % 3600) / 60));
  return `${hours} h ${minutes} m duración total`;
};

const Card = ({ course }) => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const userData = useContext(userContext);
  const [totalTime, setTotalTime] = useState(0);
  const [totalClass, setTotalClass] = useState(0);
  const [user, setUser] = useState(null);
  const courseAlreadyPurchased = (userData?.Payments || []).find((payment) =>
    (payment.Courses || []).find((elemento) => elemento.id === course.id)
  );

  useEffect(() => {
    if (course && course.lesson) {
      const totalDuration = course.lesson.reduce(
        (acc, lesson) => acc + lesson.duration,
        0
      );
      setTotalTime(totalDuration);
    }
    if (course && course.lesson) {
      const totalLessonCount = course.lesson.length;
      setTotalClass(totalLessonCount);
    }

    if (course && course.instructor_id) {
      getUserById(course.instructor_id)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.error("Error al obtener información del usuario:", error);
        });
    }
  }, [course]);

  const handleCardToDetails = () => {
    navigate(`/detailCourse/${course.id}`);
    window.scrollTo({ top: 0 });
  };

  const handleCardToCourse = () => {
    navigate(`/student/${userData.id}`);
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
    };
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
      <div className={Styles.imgContainer} onClick={handleCardToDetails}>
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
            <div>
              {!user ? null : (
                <div>
                  Desarrollado por {user.first_name} {user.last_name}
                </div>
              )}
            </div>
            <div>
              4.5 xxxxx (800)
              {course.rating} {generateStars(course.rating)}
              <div>
                {totalClass} clases - {formatTimeWithHours(totalTime)}
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.contentBottom}>
          {courseAlreadyPurchased ? (
            <Button
              text={"Ir al curso"}
              onClick={() => {
                handleCardToCourse();
              }}
            />
          ) : (
            <>
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
                    handleNavigateCart();
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
