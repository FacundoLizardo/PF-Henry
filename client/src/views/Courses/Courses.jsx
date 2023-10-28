import CardContainer from "../../Components/CardContainer/CardContainer";
import Filters from "../../Components/Filters/Filters";
import { useEffect, useState } from "react";

import Styles from "./Courses.module.css";

const Courses = () => {
  const [dataCourses, setDataCourses] = useState([]);
  useEffect(() => {
    setDataCourses(JSON.parse(localStorage.getItem("coursesData")));
  }, []);
  const [activeCategory, setActiveCategory] = useState(null);

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
            <h2
              onClick={() =>
                setActiveCategory(activeCategory === category ? null : category)
              }
              className={Styles.categoryHeader}
            >
              {category}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                className={
                  activeCategory === category
                    ? Styles.activeCategorySVG
                    : Styles.inactiveCategorySVG
                }
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M15 11l-3 3l-3 -3"></path>
                <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18z"></path>
              </svg>
            </h2>
            <div
              className={`${Styles.courses} ${
                activeCategory !== category ? Styles.hidden : ""
              }`}
            >
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
