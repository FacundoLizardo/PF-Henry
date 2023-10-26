import Filters from "../../Components/Filters/Filters";
import { listCourses } from "../../utils/data";

import Styles from "./Courses.module.css";

const Courses = () => {
  return (
    <div className={Styles.coursesContainer}>
      <Filters />
      <div>
        {listCourses.map((course, index) => (
          <div key={index}>
            <p>{course.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
