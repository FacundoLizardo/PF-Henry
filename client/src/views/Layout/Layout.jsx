import Home from "../../Components/Home/Home";
import { Link } from "react-router-dom";
import Styles from "./Layout.module.css";
import { useEffect } from "react";
import { getAllCourses } from "../../utils/getAllCourses";
import { getAllCategories } from "../../utils/getAllCategories";

const Layout = () => {
	useEffect(() => {
		getAllCourses();
		getAllCategories();
	}, []);

	return (
		<div className={Styles.layoutContainer}>
			<Home />
			<div className={Styles.layCoutontent}>
				<h2>Cursos mejor valorados por nuestros alumnos</h2>
				<Link to="/courses">
					<button className={Styles.buttonCourses}>Ver todos cursos</button>
				</Link>
			</div>
		</div>
	);
};

export default Layout;
