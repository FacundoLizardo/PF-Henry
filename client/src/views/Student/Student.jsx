import { useEffect, useState } from "react";
import Styles from "./Student.module.css";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { postRating } from "../../utils/postRating";

const Student = ({ updateContextUser }) => {
  const navigate = useNavigate();
  const [sessionCourses, setSessionCourses] = useState();
  const session = JSON.parse(localStorage.getItem("userOnSession"));

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("userOnSession"));
    if (session?.email !== "") {
      updateContextUser(session);
    }

    const sessionCourses = (session?.Payments || []).flatMap((payment) =>
      (payment.Courses || []).map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        createdAt: course.createdAt,
        enabled: course.enabled,
        image: course.image,
        instructorId: course.instructor_id,
        onSale: course.onSale,
        price: course.price,
        progress: course.progress,
        sections: course.sections,
        updatedAt: course.updatedAt,
        lesson: course.lesson,
        Rating: course.Rating,
      }))
    );
    setSessionCourses(sessionCourses);
  }, []);

  const handleNavigateToLessons = (courseId) => {
    const dataCourse = sessionCourses.find(
      (elemento) => elemento.id === courseId
    );
    navigate(`/student/classList/${courseId}`, { state: dataCourse });
  };

  const handleRating = (course_id, user_id) => {
    Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: {
        1: "1 estrella",
        2: "2 estrellas",
        3: "3 estrellas",
        4: "4 estrellas",
        5: "5 estrellas",
      },
      showCancelButton: true,
      customClass: {
        popup: "mySwal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const rating = result.value;
        Swal.fire({
          title: "Message",
          input: "textarea",
          inputLabel: "Message",
          inputPlaceholder: "Type your message here...",
          inputAttributes: {
            "aria-label": "Type your message here",
          },
          showCancelButton: true,
          customClass: {
            popup: "mySwal",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const comment = result.value;

            postRating(course_id, user_id, rating, comment);
          }
        });
      }
    });
  };
  const CourseCard = ({ courses }) => (
    <div className={Styles.cardContainer}>
      <div className={Styles.imgContainer}>
        <img src={courses.image} />
      </div>
      <div className={Styles.contentContainer}>
        <div className={Styles.contentTop}>
          <h4>{courses.title}</h4>
        </div>
        <div className={Styles.percentage}>
          <div className={Styles.progress}>
            <div className={Styles.progressBar} id="progressBar">
              %
            </div>
          </div>
        </div>
        <div className={Styles.linkRating}>
          <p onClick={() => handleRating(courses.id, session.id)}>
            Calificar curso
          </p>
          <div>
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
          </div>
        </div>
        <div className={Styles.contentBottom}>
          <Button
            onClick={() => handleNavigateToLessons(courses.id)}
            text={"Clases disponibles"}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={Styles.studentContainer}>
      <div className={Styles.studentTitle}>
        <h1>¡{session?.first_name}, bienvenido a tu área de estudio!</h1>
        <h5>Alumno n°: {session?.id}</h5>
      </div>

      <div className={Styles.studentDescription}>
        <p>
          Este es el centro de tu experiencia de aprendizaje. Aquí tendrás el
          control total sobre tu educación. Desde este espacio, podrás:
        </p>
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 1200 1200"
            >
              <path
                fill="currentColor"
                d="m1004.237 99.152l-611.44 611.441l-198.305-198.305L0 706.779l198.305 198.306l195.762 195.763L588.56 906.355L1200 294.916L1004.237 99.152z"
              />
            </svg>
            Acceder a tus cursos, verificar tu progreso y unirte a las clases.
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 1200 1200"
            >
              <path
                fill="currentColor"
                d="m1004.237 99.152l-611.44 611.441l-198.305-198.305L0 706.779l198.305 198.306l195.762 195.763L588.56 906.355L1200 294.916L1004.237 99.152z"
              />
            </svg>
            Una vez hayas terminado un curso, calificarlo y dejar tus
            comentarios para brindar orientación a otros estudiantes.
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 1200 1200"
            >
              <path
                fill="currentColor"
                d="m1004.237 99.152l-611.44 611.441l-198.305-198.305L0 706.779l198.305 198.306l195.762 195.763L588.56 906.355L1200 294.916L1004.237 99.152z"
              />
            </svg>
            Realizar un seguimiento de tu progreso y visualizar el total de
            horas dedicadas.
          </li>
        </ul>
      </div>
      <div className={Styles.coursesContainer}>
        {sessionCourses && sessionCourses.length > 0 ? (
          sessionCourses.map((courses, index) => (
            <CourseCard
              key={index}
              courses={courses}
              onClick={() => handleNavigateToLessons(courses.id)}
            />
          ))
        ) : (
          <div>No hay cursos disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default Student;
