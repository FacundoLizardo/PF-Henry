import { useParams } from "react-router-dom";
import Styles from "./DetailCourse.module.css";

const DetailCourse = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className={Styles.detailCourseContainer}>
      <div>Detalle del curso
        <p>{id}</p>
      </div>
    </div>
  );
};

export default DetailCourse;
