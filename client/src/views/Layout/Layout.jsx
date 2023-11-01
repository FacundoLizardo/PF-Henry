import Home from "../../Components/Home/Home";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../utils/getAllCourses";
import { getAllCategories } from "../../utils/getAllCategories";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import CardLayoutContainer from "../../Components/CardLayoutContainer/CardLayoutContainer";
import { getOnSaleCourses } from "../../utils/getOnSaleCourses";

import Styles from "./Layout.module.css";

const Layout = () => {
	const navigate = useNavigate();
	const [dataCourses, setDataCourses] = useState([]);
	const [onSaleCourses, setOnSlaeCourses] = useState([]);

	const handleNavigate = () => {
		navigate("./courses/");
	};

	useEffect(() => {
		const fetchData = async () => {
			await getAllCourses();
			await getAllCategories();
			setOnSlaeCourses(await getOnSaleCourses());
			setDataCourses(JSON.parse(localStorage.getItem("coursesData")));
		};
		fetchData();
	}, []);
	console.log(onSaleCourses);
	const dataCoursesByDate = dataCourses.sort((a, b) => {
		const fechaA = new Date(a.createdAt);
		const fechaB = new Date(b.createdAt);
		return fechaB - fechaA;
	});

	const dataCoursesSortedByRating = dataCourses.sort(
		(a, b) => b.rating - a.rating
	);

	const dataCoursesSortedByPurchases = dataCourses.sort(
		(a, b) => b.purchases - a.purchases
	);

	return (
		<div className={Styles.layoutContainer}>
			<Home />
			<div className={Styles.layoutContent}>
				<div className={Styles.layoutContentItem}>
					<h2>Ofertas!</h2>
					<CardLayoutContainer dataCourses={onSaleCourses} />
				</div>
				<div className={Styles.layoutContentItem}>
					<h2>Últimos cursos</h2>
					<CardLayoutContainer dataCourses={dataCoursesByDate} />
				</div>
				<h2>Cursos mejor valorados por nuestros alumnos</h2>
				<div className={Styles.layoutContentItem}>
					<CardLayoutContainer dataCourses={dataCoursesSortedByRating} />
				</div>
				<h2>Cursos más comprados</h2>
				<div className={Styles.layoutContentItem}>
					<CardLayoutContainer dataCourses={dataCoursesSortedByPurchases} />
				</div>
			</div>
			<div className={Styles.layoutBottom}>
				<Button text={"Ver todos cursos"} onClick={handleNavigate} />
			</div>
		</div>
	);
};

export default Layout;
