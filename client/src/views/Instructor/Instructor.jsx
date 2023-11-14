import { useNavigate } from "react-router-dom";
import Styles from "./Instructor.module.css";
import Button from "../../Components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import updateCourse from "../../utils/updateCourse";
import { getAllCourses } from "../../utils/getAllCourses";
import Swal from "sweetalert2";

const Instructor = ({ updateContextUser }) => {
  const userData = useContext(userContext);
  const navigate = useNavigate();
  const [dataCourses, setDataCourses] = useState();

  const updateData = () => {
    setDataCourses(JSON.parse(localStorage.getItem("coursesData")));
  };
  useEffect(() => {
    updateData();
    const session = JSON.parse(localStorage.getItem("userOnSession"));
    if (session?.email !== "") {
      updateContextUser(session);
    }
  }, []);

  const coursesCreated = dataCourses
    ? dataCourses.filter(
        (item) => item.instructor_id === userData?.id && item.enabled === true
      )
    : [];

  const enabledCourses = dataCourses
    ? dataCourses.filter(
        (item) => item.instructor_id === userData?.id && item.enabled === false
      )
    : [];

  const handleNavigate = (destination) => {
    navigate(destination);
  };

  const enableRestoreCourse = async (id, value) => {
    const enableFalseCourse = {
      id: id,
      enabled: value,
    };
    console.log(value);
    if (value === true) {
      Swal.fire({
        title: "¿Seguro que quieres restaurar el curso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3d0dca",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Aceptar",
        customClass: {
          popup: "mySwal",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse(enableFalseCourse);
          await getAllCourses();
          updateData();
          Swal.fire({
            title: "Tu curso fue restaurado",
            icon: "success",
            customClass: {
              popup: "mySwal",
            },
          });
        }
      });
    }
    if (value === false) {
      Swal.fire({
        title: "¿Seguro que quieres eliminar el curso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3d0dca",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Aceptar",
        customClass: {
          popup: "mySwal",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse(enableFalseCourse);
          await getAllCourses();
          updateData();
          Swal.fire({
            title: "Tu curso fue eliminado",
            icon: "success",
            customClass: {
              popup: "mySwal",
            },
          });
        }
      });
    }
  };

  const openCloseModal = (id, string) => {
    if (string) {
      Swal.fire({
        title: "Modifica el descuento ingresando el nuevo porcentaje",
        text: "TEN EN CUENTA QUE SI INGRESAS 0 TU CURSO TENDRA EL PRECIO ORIGINAL",

        showCloseButton: true,
        icon: "warning",
        input: "number",
        inputLabel: "Porcentaje de descuento nuevo:",
        inputAttributes: {
          min: "0",
          max: "99",
        },
        inputValue: 0,
        customClass: {
          popup: "mySwal",
        },
      }).then(async (result) => {
        let newDataCourse;

        if (result.value === "0") {
          console.log("value 0");
          newDataCourse = {
            id: id,
            onSale: false,
            percentageDiscount: parseInt(result.value),
          };
        }
        if (result.value != "0") {
          newDataCourse = {
            id: id,
            onSale: true,
            percentageDiscount: parseInt(result.value),
          };
        }
        if (result.isConfirmed && newDataCourse.percentageDiscount >= 1) {
          console.log(newDataCourse);
          await updateCourse(newDataCourse);
          await getAllCourses();
          updateData();

          Swal.fire({
            title: "Se modifico el descuento de tu curso con exito!",
            icon: "success",
            customClass: {
              popup: "mySwal",
            },
          });
        }
        if (result.isConfirmed && newDataCourse.percentageDiscount === 0) {
          await updateCourse(newDataCourse);
          await getAllCourses();
          updateData();

          Swal.fire({
            title: "Se retiro tu curso de la lista de ofertas!",
            icon: "success",
            customClass: {
              popup: "mySwal",
            },
          });
        }
      });
    }
    if (!string) {
      Swal.fire({
        title: "Que porcentaje de descuento deseas agregar?",
        showCloseButton: true,
        validationMessage: "El porcentaje de descuento no puede ser 0",
        icon: "question",
        input: "number",
        inputLabel: "Porcentaje de descuento:",
        inputAttributes: {
          min: "1",
          max: "99",
        },
        inputValue: 0,
        customClass: {
          popup: "mySwal",
        },
      }).then(async (result) => {
        const newDataCourse = {
          id: id,
          onSale: true,
          percentageDiscount: parseInt(result.value),
        };
        if (result.isConfirmed) {
          await updateCourse(newDataCourse);
          await getAllCourses();
          updateData();

          Swal.fire({
            title: "Tu curso ahora esta en oferta!",
            icon: "success",
            customClass: {
              popup: "mySwal",
            },
          });
        }
      });
    }
  };

  const handleRating = (course) => {
    if (course && course.ratings) {
      let totalRating = 0;
      let totalComments = 0;

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
          ${course.ratings
            .map((rating, index) => {
              totalRating += rating.rating;
              totalComments++;
              return `
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
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;

      const averageRating = totalRating / totalComments;

      Swal.fire({
        title: "Calificaciones",
        html: `
        <div>
          <p>Promedio de calificación: ${averageRating.toFixed(2)}</p>
          <p>Total de comentarios: ${totalComments}</p>
		  <br>
        </div>
        ${formattedRatings}
      `,
        customClass: {
          popup: "mySwal",
        },
      });
    }
  };

  return (
    <div className={Styles.instructorContainer}>
      <div className={Styles.instructorContainerTitle}>
        <h1>
          ¡Hola <span>{userData?.first_name}</span>!
        </h1>
      </div>
      <div className={Styles.instructorContainerCreate}>
        <p>¡Empieza, crea tu curso!</p>
        <Button
          text={"Crea tu curso"}
          onClick={() => handleNavigate(`/instructor/${userData?.id}/form`)}
        />
      </div>
      <div className={Styles.instructorContainerCourse}>
        <div>
          <h3>Tus cursos</h3>
        </div>
        {coursesCreated.map((course, index) => (
          <div key={index} className={Styles.courseContainer}>
            <div className={Styles.cardCourse}>
              <div className={Styles.courseImg}>
                <img src={course.image} alt={course.title} />
              </div>
              <div className={Styles.courseInfo}>
                <div className={Styles.courseHeader}>
                  <div>
                    <h3>{course.title}</h3>
                  </div>
                  <div>
                    <button onClick={() => handleRating(course)}>
                      Ver calificaciones
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="128"
                        height="128"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M9 22c-.6 0-1-.4-1-1v-3H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-6.1l-3.7 3.7c-.2.2-.4.3-.7.3H9m4-11V5h-2v6m2 4v-2h-2v2h2Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={Styles.buttonContainer}>
                  <Button
                    text={"Crea clases"}
                    onClick={() =>
                      handleNavigate(`/instructor/${course.id}/createLecture`)
                    }
                  />
                  <Button
                    text={"Editar curso"}
                    onClick={() => handleNavigate(`/edit/${course.id}`)}
                  />

                  {course.onSale === true ? (
                    <>
                      <Button
                        text={"Modificar descuento"}
                        onClick={() => openCloseModal(course.id, "modificar")}
                      />
                    </>
                  ) : (
                    <Button
                      text={"Agregar descuento"}
                      onClick={() => openCloseModal(course.id)}
                    />
                  )}

                  <Button
                    text={"Eliminar curso"}
                    onClick={() => enableRestoreCourse(course.id, false)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={Styles.disabledCourses}>
        <div>
          <h3>Tus cursos desactivados</h3>
        </div>
        {enabledCourses.length === 0 ? (
          <div className={Styles.enabledCourses}>
            <p>No hay cursos desactivados</p>
          </div>
        ) : (
          enabledCourses.map((course, index) => (
            <div key={index} className={Styles.courseContainer}>
              <div className={Styles.cardCourse}>
                <div className={Styles.courseImg}>
                  <img src={course.image} alt={course.title} />
                </div>
                <div className={Styles.courseInfo}>
                  <h2>{course.title}</h2>
                  <div className={Styles.buttonContainer}>
                    <Button
                      text={"Editar curso"}
                      onClick={() => handleNavigate(`/edit/${course.id}`)}
                    />
                    <Button
                      text={"Restaurar curso"}
                      onClick={() => enableRestoreCourse(course.id, true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Instructor;
