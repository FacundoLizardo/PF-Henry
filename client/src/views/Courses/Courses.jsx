import CardContainer from "../../Components/CardContainer/CardContainer";
import Filters from "../../Components/Filters/Filters";
import { useNavigate } from "react-router-dom";

import Styles from "./Courses.module.css";
import { useEffect, useState } from "react";

const Courses = () => {
  const navigate = useNavigate();
  const [dataCourses, setDataCourses] = useState([]);
  useEffect(() => {
    setDataCourses(JSON.parse(localStorage.getItem("coursesData")));
  }, []);

  const handleNavigate = (detailId) => {
    navigate(`./detailCourse/${detailId}`);
  };

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
