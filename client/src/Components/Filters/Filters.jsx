import Styles from "./Filters.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Courses from "../../views/Courses/Courses";

export default function Filters() {
	const [categoriesData, setCategoriesData] = useState([]);
	const [categoryFilter, setCategoryFilter] = useState("undefined");
	const [ratingFilter, setRatingFilter] = useState("undefined");
	const [order, setOrder] = useState("udefined");

	const [dataCourses, setDataCourses] = useState({
		data: [],
		filteredData: [],
	});

	// setState((prevState) => ({
	// 	...prevState,
	// 	rating: 5, // El nuevo valor de "rating"
	// }));

	useEffect(() => {
		setDataCourses((prevState) => ({
			...prevState,
			data: JSON.parse(localStorage.getItem("coursesData")),
		}));
		setCategoriesData(JSON.parse(localStorage.getItem("categoriesData")));
	}, []);

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		if (name === "category") {
			filterCourses(value);
			setCategoryFilter(value);
		}
	};

	const filterCourses = (value) => {
		setDataCourses((prevState) => ({
			...prevState,
			filteredData: dataCourses.data.filter((course) => {
				return course.category === value;
			}),
		}));
	};

	const handleChangeOrder = () => {};

	const handleReset = () => {
		setDataCourses((prevState) => ({
			...prevState,
			filteredData: [],
		}));
	};

	return (
		<div className={Styles.mainContainer}>
			<section id="container" className={Styles.filtersContainer}>
				<div className={Styles.filtOrderCont}>
					<div className={Styles.filters}>
						{/* 		

 */}
						<select
							className={Styles.filterButt}
							onChange={handleChange}
							name="category"
							value={categoryFilter}
						>
							<option>Categorías</option>
							{categoriesData?.map((category, index) => (
								<option key={index}>{category.name}</option>
							))}
						</select>
						{/* 		


 */}
						<select
							className={Styles.filterButt}
							onChange={handleChange}
							value={ratingFilter}
							name="rating"
						>
							<option disabled>Filtrar por rating</option>
							<option value="5">5 estrellas</option>
							<option value="4">4 estrellas</option>
							<option value="3">3 estrellas</option>
							<option value="2">2 estrellas</option>
							<option value="1">1 estrella</option>
						</select>

						{/* 		


 */}
						<select
							className={Styles.filterButt}
							value={order}
							onChange={handleChangeOrder}
						>
							<option disabled>Ordenar por precio</option>
							<option value="ASC">Menor a mayor</option>
							<option value="DESC">Mayor a menor</option>
						</select>
					</div>

					<div className={Styles.reset}>
						<button className="reset-button" onClick={handleReset}>
							Restablecer
						</button>
					</div>
				</div>
			</section>
			{dataCourses.filteredData.length >= 1 ? (
				<Courses dataCourses={dataCourses.filteredData} />
			) : (
				<Courses dataCourses={dataCourses.data} />
			)}
		</div>
	);
}
