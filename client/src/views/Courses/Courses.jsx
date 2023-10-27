import CardContainer from "../../Components/CardContainer/CardContainer";
import Filters from "../../Components/Filters/Filters";
import { useEffect, useState } from "react";

import Styles from "./Courses.module.css";

const Courses = () => {
  const [dataCourses, setDataCourses] = useState([]);
  useEffect(() => {
    setDataCourses(JSON.parse(localStorage.getItem("coursesData")));
  }, []);

  const groupedCourses = dataCourses.reduce((result, course) => {
    if (!result[course.category]) {
      result[course.category] = [];
    }
    result[course.category].push(course);
    return result;
  }, {});

  return (
    <div className={Styles.coursesContainer}>
      <Filters />
      <div>
        {Object.entries(groupedCourses).map(([category, courses], index) => (
          <div className={Styles.categoryContainer} key={index}>
            <h2>{category}</h2>
            <div className={Styles.courses}>
              {courses.map((course, courseIndex) => (
                <CardContainer course={course} key={courseIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
