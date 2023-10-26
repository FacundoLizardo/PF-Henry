import CardContainer from "../../Components/CardContainer/CardContainer";
import Filters from "../../Components/Filters/Filters";
import { listCourses } from "../../utils/data";
import { useNavigate } from "react-router-dom";

import Styles from "./Courses.module.css";

const Courses = () => {
  const navigate = useNavigate();

  const groupedCourses = listCourses.reduce((result, course) => {
    if (!result[course.category]) {
      result[course.category] = [];
    }
    result[course.category].push(course);
    return result;
  }, {});

  const handleNavigate = (detailId) => {
    navigate(`./detailCourse/${detailId}`);
  };

  return (
    <div className={Styles.coursesContainer}>
      <Filters />
      <div>
        {Object.entries(groupedCourses).map(([category, courses], index) => (
          <div className={Styles.categoryContainer} key={index}>
            <h2>{category}</h2>
            <div className={Styles.courses}>
              {courses.map((course, courseIndex) => (
                <CardContainer
                  course={course}
                  key={courseIndex}
                  handleNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
