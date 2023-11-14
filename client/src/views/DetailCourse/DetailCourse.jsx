import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Styles from "./DetailCourse.module.css";
import Button from "../../Components/Button/Button";
import { userContext } from "../../App";
import { useCart } from "../../context/CartContext";
import Swal from "sweetalert2";

const formatTime = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const restSeconds = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${restSeconds}`;
};

const formatTimeWithHours = (seconds) => {
  const hours = String(Math.floor(seconds / 3600));
  const minutes = String(Math.floor((seconds % 3600) / 60));
  const restSeconds = String(seconds % 60);
  return `${hours} h ${minutes} m ${restSeconds} s`;
};

const DetailCourse = ({ updateContextUser }) => {
  const { id } = useParams();
  const [dataDetail, setDataDetail] = useState(null);
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const userData = useContext(userContext);
  const [totalTime, setTotalTime] = useState(0);
  const [totalClass, setTotalClass] = useState(0);

  useEffect(() => {
    axios
      .get(`/courses/${id}`)
      .then((response) => {
        setDataDetail(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos del curso", error);
      });
  }, [id]);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("userOnSession"));
    if (session?.email !== "") {
      updateContextUser(session);
    }

    if (dataDetail && dataDetail.lesson) {
      const totalDuration = dataDetail.lesson.reduce(
        (acc, lesson) => acc + lesson.duration,
        0
      );
      setTotalTime(totalDuration);
      setTotalClass(dataDetail.lesson.length);
    }
  }, [dataDetail]);

  const handleCardToCourse = () => {
    navigate(`/student/${userData.id}`);
  };

  const handleNavigateCart = () => {
    navigate(`/cart/${userData.id}`);
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const addToCart = () => {
    if (dataDetail) {
      const newPrice =
        dataDetail.price -
        (dataDetail.price * dataDetail.percentageDiscount) / 100;
      const roundedNewPrice = parseFloat(newPrice.toFixed(2));

      const productToAddToCart = {
        id: dataDetail.id,
        name: dataDetail.title,
        price: roundedNewPrice,
        image: dataDetail.image || "",
        description: dataDetail.description,
        category: dataDetail.category,
        createdAt: dataDetail.createdAt,
        enabled: dataDetail.enabled,
        instructorId: dataDetail.instructor_id,
        onSale: dataDetail.onSale,
        progress: dataDetail.progress,
        sections: dataDetail.sections,
        updatedAt: dataDetail.updatedAt,
        lesson: dataDetail.lesson,
        ratings: dataDetail.ratings,
      };
      dispatch({ type: "ADD_TO_CART", payload: productToAddToCart });
      handleNavigateCart();
    }
  };

  const courseAlreadyPurchased = (userData?.Payments || []).find((payment) =>
    (payment.Courses || []).find(
      (elemento) => elemento.id === (dataDetail?.id || 0)
    )
  );

  const lessonsBySection = {};
  if (dataDetail && dataDetail.lesson) {
    dataDetail.lesson.forEach((lesson) => {
      const section = lesson.section;
      if (!lessonsBySection[section]) {
        lessonsBySection[section] = [];
      }
      lessonsBySection[section].push(lesson);
    });
  }

  const handleRating = () => {
    if (dataDetail && dataDetail.ratings) {
      const formattedRatings = `
        <table style="border-collapse: collapse; width: 100%; min-width: 400px; font-size: 14px;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center; min-width: 30px;">#</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center; min-width: 100px;">Calificación</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center; min-width: 250px;">Comentario</th>
            </tr>
          </thead>
          <tbody>
            ${dataDetail.ratings
              .map(
                (rating, index) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center; min-width: 30px;">${
                  index + 1
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center; min-width: 100px;">${
                  rating.rating
                } estrellas</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center; min-width: 250px;">${
                  rating.comment
                }</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;

      Swal.fire({
        title: "Calificaciones",
        html: formattedRatings,
        customClass: {
          popup: "mySwal",
        },
      });
    }
  };

  return (
    <div className={Styles.detailCourseContainer}>
      <header>
        <div className={Styles.detailContentTop}>
          <div className={Styles.imageContainer}>
            {dataDetail && dataDetail.image && (
              <img
                src={dataDetail.image}
                alt={dataDetail.title}
                className={Styles.courseImage}
              />
            )}
          </div>
          <div className={Styles.descriptionContainer}>
            <div>
              <h1>{dataDetail?.title}</h1>
            </div>
            <div>{dataDetail?.description}</div>
            <div>
              <Button text={"Ver calificaciones"} onClick={handleRating} />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className={Styles.listContainer}>
          {dataDetail && Object.keys(lessonsBySection).length > 0 ? (
            Object.keys(lessonsBySection).map((section) => (
              <div key={section}>
                <h3 className={Styles.section}>Sección {section}</h3>
                {lessonsBySection[section].map((elemento) => (
                  <div key={elemento.id} className={Styles.listItem}>
                    <div>
                      <h4>{elemento.title}</h4>
                    </div>
                    <div>{formatTime(elemento.duration)}</div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No se encontraron lecciones para este curso.</p>
          )}
          <div className={Styles.listTime}>
            <h3>
              {totalClass} clases - duración del curso:{" "}
              {formatTimeWithHours(totalTime)}
            </h3>
          </div>
        </div>
        <footer className={Styles.buttonsContainer}>
          <div className={Styles.buttonsContainer}>
            <Button text={"Volver"} onClick={handleGoBack} />
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
              <Button text={"¡Comprar ahora!"} onClick={addToCart} />
            )}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DetailCourse;
