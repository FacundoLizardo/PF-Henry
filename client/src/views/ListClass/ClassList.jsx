import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./ClassList.module.css";
import Button from "../../Components/Button/Button";

const ClassList = () => {
  const { state } = useLocation();
  const selectedCourse = state.courseData;
  const navigate = useNavigate();

  const handleNavigateToLecture = (lessonId) => {
    if (selectedCourse && selectedCourse.lessons) {
      const selectedLesson = selectedCourse.lessons.find(
        (lesson) => lesson.lesson_id === lessonId
      );
      if (selectedLesson) {
        navigate(`/student/classList/lecture/${lessonId}`, {
          state: { lessonData: selectedLesson },
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
      {selectedCourse && selectedCourse.lessons ? (
        selectedCourse.lessons.map((lesson, index) => (
          <div key={lesson.lesson_id} className={Styles.classListContent}>
            <p key={index}>{lesson.title}</p>
            <Button
              text={"Ir"}
              onClick={() => handleNavigateToLecture(lesson.lesson_id)}
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
