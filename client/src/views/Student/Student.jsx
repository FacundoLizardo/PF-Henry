import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";

import Styles from "./Student.module.css";

import { listCourses } from "../../utils/data";

const Student = () => {
  const navigate = useNavigate();

  const handleNavigateToLessons = (courseId) => {
    const selectedCourse = listCourses.find(
      (course) => course.course_id === courseId
    );
    navigate(`/student/classList/${courseId}`, {
      state: { courseData: selectedCourse },
    });
  };

  return (
    <div className={Styles.studentContainer}>
      <div>
        <h1>Mis cursos</h1>
        {listCourses.map((course) => (
          <div key={course.course_id} className={Styles.studentContent}>
            <h2>{course.title}</h2>
            <Button
              text={"Clases"}
              onClick={() => handleNavigateToLessons(course.course_id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;
