import Styles from "./Instructor.module.css";
import { Link } from "react-router-dom";
const Instructor = () => {
	return (
		<div className={Styles.instructorContainer}>
			<div>Hola soy instructor</div>
			<Link to="/form">
				<button>Crear nuevo curso</button>
			</Link>
		</div>
	);
};

export default Instructor;
