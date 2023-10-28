// import CardContainer from "../../Components/CardContainer/CardContainer";
// import Filters from "../../Components/Filters/Filters";
// import { useNavigate } from "react-router-dom";
// import Styles from "./Courses.module.css";
// import { useEffect, useState } from "react";

// const Courses = () => {
//   const navigate = useNavigate();
//   const [dataCourses, setDataCourses] = useState([]);
//   const [groupedCourses, setGroupedCourses] = useState({}); 

//   useEffect(() => {
//     const coursesData = JSON.parse(localStorage.getItem("coursesData"));
//     console.log("Cursos en localStorage:", coursesData); // Verifica si los datos se cargan correctamente

//     if (coursesData) {
//       setDataCourses(coursesData);

//       const grouped = coursesData.reduce((result, course) => {
//         if (!result[course.category]) {
//           result[course.category] = [];
//         }
//         result[course.category].push(course);
//         return result;
//       }, {});

//       setGroupedCourses(grouped); 
//     }
//   }, []);

//   const handleNavigate = (detailId) => {
//     navigate(`./detailCourse/${detailId}`);
//   };

//   const handleResetFilter = () => {
//     setFilters({
//       category: "undefined",
//       order: "undefined",
//       popularity: "undefined",
//       rating: "undefined",
//     });

//     console.log("Reiniciar filtros");
//   };

//   return (
//     <div className={Styles.coursesContainer}>
//       <Filters handleResetFilter={handleResetFilter}/>
//       <div>
//         {Object.entries(groupedCourses).map(([category, courses], index) => (
//           <div className={Styles.categoryContainer} key={index}>
//             <h2>{category}</h2>
//             <div className={Styles.courses}>
//               {courses.map((course, courseIndex) => (
//                 <CardContainer
//                   course={course}
//                   key={courseIndex}
//                   handleNavigate={handleNavigate}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Courses;
