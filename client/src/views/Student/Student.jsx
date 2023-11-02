import Styles from "./Student.module.css";
import { userContext } from "../../App";
import { useContext } from "react";

const Student = () => {
	const userData = useContext(userContext);

	/* const handleNavigateToLessons = (courseId) => {
    const selectedCourse = listCourses.find(
      (course) => course.course_id === courseId
    );
    navigate(`/student/classList/${courseId}`, {
      state: { courseData: selectedCourse },
    });
  }; */

	return (
		<div className={Styles.studentContainer}>
			<div>
				<div>
					<h5>Alumno n°: {userData?.id}</h5>
				</div>
				<div>
					<h1>Mis cursos</h1>
					{/*   {listCourses.map((course) => (
            <div key={course.course_id} className={Styles.studentContent}>
              <h2>{course.title}</h2>
              <Button
                text={"Clases"}
                onClick={() => handleNavigateToLessons(course.course_id)}
              />
            </div>
          ))} */}
				</div>
			</div>
		</div>
	);
};

export default Student;
