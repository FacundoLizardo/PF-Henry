import CardContainer from "../../Components/CardContainer/CardContainer";
import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import axios from "axios";

import Styles from "./Courses.module.css";
import Card from "../../Components/Card/Card";

const Courses = () => {
	const [dataCourses, setDataCourses] = useState({
		data: [],
		filteredData: [],
	});
	const [activeCategory, setActiveCategory] = useState(null);
	const [categoriesData, setCategoriesData] = useState([]);
	const [ratingFilter, setRatingFilter] = useState("");
	const [orderFilter, setOrderFilter] = useState("Default");
	const dataCopy = [...dataCourses.data];

	useEffect(() => {
		setDataCourses((prevState) => ({
			...prevState,
			data: JSON.parse(localStorage.getItem("coursesData")),
		}));
		setCategoriesData(JSON.parse(localStorage.getItem("categoriesData")));
	}, []);

	const groupedCourses = dataCourses.data.reduce((result, course) => {
		const category = course.category;
		if (!result[category]) {
			result[category] = [];
		}
		result[category].push(course);
		return result;
	}, {});

	const dataFiltered = async (e) => {
		const categoryFilter = e.target.value;

		const url = `/courses?category=${categoryFilter}`;

		if (categoryFilter) {
			const { data } = await axios.get(url);
			setDataCourses((prevState) => ({
				...prevState,
				filteredData: data,
			}));
		}
	};

	const sortByPrice = () => {
		const sortedData = [...dataCourses.data];
		const sortedFilteredData = dataCourses.filteredData.length
			? [...dataCourses.filteredData]
			: [];

		if (orderFilter === "ASC") {
			sortedData.sort((a, b) => a.price - b.price);
			sortedFilteredData.sort((a, b) => a.price - b.price);
		} else if (orderFilter === "DESC") {
			sortedData.sort((a, b) => b.price - a.price);
			sortedFilteredData.sort((a, b) => b.price - a.price);
		}

		setDataCourses((prevState) => ({
			...prevState,
			data: sortedData,
			filteredData: sortedFilteredData,
		}));
	};

	const handleorderFilter = (e) => {
		const selectedOrder = e.target.value;
		setOrderFilter(selectedOrder);
		sortByPrice();
	};

	const handleReset = () => {
		const selectElement = document.getElementById("category");
		const optionToSelect = selectElement.querySelector(
			'option[name="categories"]'
		);

		if (optionToSelect) {
			optionToSelect.selected = true;
		}

		setDataCourses((prevState) => ({
			...prevState,
			dataCourses: [...dataCopy],
			filteredData: [],
		}));
	};

	return (
		<div className={Styles.coursesContainer}>
			<section id="container" className={Styles.filtersContainer}>
				<div className={Styles.filtOrderCont}>
					<div className={Styles.filters}>
						<select
							className={Styles.filterButt}
							onChange={dataFiltered}
							name="category"
							id="category"
						>
							<option value="categories">Categorías</option>
							{categoriesData?.map((category, index) => (
								<option key={index} value={category.name}>
									{category.name}
								</option>
							))}
						</select>

						<select
							className={Styles.filterButt}
							onChange={() => {}}
							name="rating"
						>
							<option value={""}>Filtrar por rating</option>
							<option value={5}>5 estrellas</option>
							<option value={4}>4 estrellas</option>
							<option value={3}>3 estrellas</option>
							<option value={2}>2 estrellas</option>
							<option value={1}>1 estrella</option>
						</select>

						<select
							className={Styles.filterButt}
							onChange={handleorderFilter}
							name="order"
						>
							<option value={"Default"}>Ordenar por precio</option>
							<option value="ASC">Menor a mayor</option>
							<option value="DESC">Mayor a menor</option>
						</select>
					</div>

					<div className={Styles.reset}>
						<Button
							className="reset-button"
							onClick={handleReset}
							text={"Restablecer"}
						/>
					</div>
				</div>
			</section>
			<section></section>
			<section>
				{dataCourses.filteredData.length > 0 ? (
					<div className={Styles.categoryContainer}>
						<div className={`${Styles.courses}`}>
							{dataCourses.filteredData.map((course, index) => (
								<Card key={index} course={course} />
							))}
						</div>
					</div>
				) : (
					Object.keys(groupedCourses).map((category, index) => (
						<div className={Styles.categoryContainer} key={index}>
							<h2
								onClick={() =>
									setActiveCategory(
										activeCategory === category ? null : category
									)
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
								{groupedCourses[category].map((course, index) => (
									<CardContainer course={course} key={index} />
								))}
							</div>
						</div>
					))
				)}
			</section>
		</div>
	);
};

export default Courses;
