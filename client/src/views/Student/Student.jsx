import Styles from "./Student.module.css";
import { userContext } from "../../App";
import { useContext } from "react";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const userData = useContext(userContext);
  const navigate = useNavigate();

  const handleNavigateToLessons = (courseId) => {
    const selectedCourse = userData.Courses.find(
      (course) => course.id === courseId
    );
    navigate(`/student/classList/${courseId}`, {
      state: { dataCourses: selectedCourse },
    });
  };

  const CourseCard = ({ course, onClick }) => (
    <div className={Styles.courseCard}>
      <div className={Styles.courseCardImage}>
        <img src={course.image} alt={course.title} />
      </div>
      <div className={Styles.courseCardContent}>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <Button text={"Clases"} onClick={onClick} />
      </div>
    </div>
  );

  return (
    <div className={Styles.studentContainer}>
      <div>
        <div>
          <h5>Alumno n°: {userData?.id}</h5>
        </div>
        <div>
          <h1>Mis cursos</h1>
          {userData?.Courses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              onClick={() => handleNavigateToLessons(course.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Student;
