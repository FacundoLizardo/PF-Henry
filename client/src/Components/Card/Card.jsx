/* eslint-disable no-empty */
import { useNavigate } from "react-router-dom";
import Styles from "./Card.module.css";
import Button from "../Button/Button";
import { useCart } from "../../context/CartContext";
import { userContext } from "../../App";
import { useContext, useEffect, useState } from "react";

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
  const user = JSON.parse(localStorage.getItem("allUser"));
  const courseAlreadyPurchased = (userData?.Payments || []).find((payment) =>
    (payment.Courses || []).find((elemento) => elemento.id === course.id)
  );
  console.log(course);

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
      ratings: course.ratings,
    };
    dispatch({ type: "ADD_TO_CART", payload: productToAddToCart });
  };

  const calculateRating = (ratings) => {
    if (ratings.length === 0) {
      return 0;
    }

    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = totalRating / ratings.length;

    return averageRating;
  };
  const averageRating = calculateRating(
    course.ratings.map((rating) => rating.rating)
  );

  const calculateCommentCount = (ratings) => {
    return ratings.length;
  };

  const commentCount = calculateCommentCount(course.ratings);

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
              {user
                ? user
                    .filter((item) => item.id === course.instructor_id)
                    .map((elemento, index) => (
                      <div key={index}>
                        Desarrollado por {elemento.first_name}{" "}
                        {elemento.last_name}
                      </div>
                    ))
                : null}
            </div>
            <div>
              <div className={Styles.ratingContainer}>
                <div>{averageRating} </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="128"
                    height="128"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                    />
                  </svg>
                </div>
                <div>
                  - {commentCount}{" "}
                  {commentCount === 1 ? "comentario" : "comentarios"}
                </div>
              </div>
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
