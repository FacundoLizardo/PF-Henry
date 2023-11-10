import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./ClassList.module.css";
import Button from "../../Components/Button/Button";
import { useEffect, useState } from "react";

const formatTime = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const restSeconds = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${restSeconds}`;
};

const formatTimeWithHours = (seconds) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const restSeconds = String(seconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${restSeconds} hs`;
};

const ClassList = ({ updateContextUser }) => {
  const { state } = useLocation();
  const selectedCourse = state;
  const navigate = useNavigate();
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("userOnSession"));
    if (session?.email !== "") {
      updateContextUser(session);
    }
    if (selectedCourse && selectedCourse.lesson) {
      const totalDuration = selectedCourse.lesson.reduce(
        (acc, lesson) => acc + lesson.duration,
        0
      );
      setTotalTime(totalDuration);
    }
  }, [selectedCourse]);

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
      <header>
        <div>
          <h1>{selectedCourse && selectedCourse.title}</h1>
        </div>
        <div>
          <Button text={"Contactar al instructor"} />
        </div>
      </header>
      <main>
        <div></div>
        <div className={Styles.listContainer}>
          {selectedCourse &&
          selectedCourse.lesson &&
          selectedCourse.lesson.length > 0 ? (
            selectedCourse.lesson.map((elemento) => (
              <div key={elemento.id} className={Styles.listItem}>
                <div>
                  <h4 onClick={() => handleNavigateToLecture(elemento.id)}>
                    {elemento.title}
                  </h4>
                </div>
                <div>{formatTime(elemento.duration)}</div>
              </div>
            ))
          ) : (
            <p>No se encontraron lecciones para este curso.</p>
          )}
          <div>Duración del curso: {formatTimeWithHours(totalTime)}</div>
        </div>
      </main>
    </div>
  );
};

export default ClassList;
