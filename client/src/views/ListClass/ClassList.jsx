import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./ClassList.module.css";
import Button from "../../Components/Button/Button";

const ClassList = () => {
  const { state } = useLocation();
  const selectedCourse = state[0];
  console.log("estado en list", selectedCourse);
  const navigate = useNavigate();

  const handleNavigateToLecture = (lessonId) => {
    if (selectedCourse && selectedCourse.lesson) {
      const selectedLesson = selectedCourse.lesson.find(
        (lesson) => lesson.id === lessonId
      );
      if (selectedLesson) {
        navigate(`/student/classList/lecture/${lessonId}`, {
          state: selectedLesson,
        });
      } else {
        console.log("Lección no encontrada");
      }
    } else {
      console.log("Curso o lecciones no encontradas en selectedCourse");
    }
  };

  return (
    <div className={Styles.classListContainer}>
      <h1>Lista de Clases</h1>
      {selectedCourse &&
      selectedCourse.lesson &&
      selectedCourse.lesson.length > 0 ? (
        selectedCourse.lesson.map((elemento) => (
          <div key={elemento.id}>
            <p>{elemento.title}</p>
            <p>{elemento.description}</p>
            <Button
              onClick={() => handleNavigateToLecture(elemento.id)}
              text={"Ir a la clase"}
            />
          </div>
        ))
      ) : (
        <p>No se encontraron lecciones para este curso.</p>
      )}
    </div>
  );
};

export default ClassList;
