import { useLocation, useNavigate, useParams } from "react-router-dom";
import Styles from "./ClassList.module.css";
import Button from "../../Components/Button/Button";
import { useEffect, useState } from "react";

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

const ClassList = ({ updateContextUser }) => {
  const { state } = useLocation();
  const selectedCourse = state;
  const courses = JSON.parse(localStorage.getItem("coursesData"));
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [totalTime, setTotalTime] = useState(0);
  const [totalClass, setTotalClass] = useState(0);
  const course = courses.filter((element) => {
    return element.id === courseId;
  });

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

    if (selectedCourse && selectedCourse.lesson) {
      const totalLessonCount = selectedCourse.lesson.length;
      setTotalClass(totalLessonCount);
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

  const handleNavigateToMessage = async (instructorId) => {
    navigate(`/mailer/${instructorId}`);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const lessonsBySection = {};
  if (selectedCourse && selectedCourse.lesson) {
    selectedCourse.lesson.forEach((lesson) => {
      const section = lesson.section;
      if (!lessonsBySection[section]) {
        lessonsBySection[section] = [];
      }
      lessonsBySection[section].push(lesson);
    });
  }

  return (
    <div className={Styles.classListContainer}>
      <header>
        <div>
          <h1>{selectedCourse && selectedCourse.title}</h1>
        </div>
        <div className={Styles.headerButton}>
          <Button text={"Volver"} onClick={handleGoBack} />
          <Button
            text={"Contactar al instructor"}
            onClick={() => handleNavigateToMessage(course[0].dataInstructor.id)}
          />
        </div>
      </header>
      <main>
        <div></div>
        <div className={Styles.listContainer}>
          {selectedCourse && Object.keys(lessonsBySection).length > 0 ? (
            Object.keys(lessonsBySection).map((section) => (
              <div key={section}>
                <h3 className={Styles.section}>Sección {section}</h3>
                {lessonsBySection[section].map((elemento) => (
                  <div
                    key={elemento.id}
                    className={Styles.listItem}
                    onClick={() => handleNavigateToLecture(elemento.id)}
                  >
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
      </main>
    </div>
  );
};

export default ClassList;
