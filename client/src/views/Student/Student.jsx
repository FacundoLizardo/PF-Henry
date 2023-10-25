import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Styles from "./Student.module.css";

const Student = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/lecture");
  };

  return (
    <div className={Styles.studentContainer}>
      <div>
        Hola, soy Alumno
        <Button text={"Ir al curso"} onClick={handleNavigate} />
      </div>
    </div>
  );
};

export default Student;
