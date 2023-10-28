import { useNavigate } from "react-router-dom";
import Styles from "./Instructor.module.css";
import Button from "../../Components/Button/Button";

const Instructor = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("./form/");
  };

  return (
    <div className={Styles.instructorContainer}>
      <div>Instructor</div>
      <Button text={"Crear nuevo curso"} onClick={handleNavigate} />
    </div>
  );
};

export default Instructor;
