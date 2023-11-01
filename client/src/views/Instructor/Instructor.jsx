import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./Instructor.module.css";
import Button from "../../Components/Button/Button";
import { useEffect, useState } from "react";

const Instructor = () => {
	const { state } = useLocation();
	const userData = state.userData;
	const navigate = useNavigate();
	const [dataCourses, setDataCourses] = useState();

	useEffect(() => {
		setDataCourses(JSON.parse(localStorage.getItem("coursesData")));
	}, []);

	const coursesCreated = dataCourses
		? dataCourses.filter((item) => item.instructor_id === userData.id)
		: [];

	const handleNavigate = () => {
		navigate("./form/");
	};

	return (
		<div className={Styles.instructorContainer}>
			<div className={Styles.instructorContainerTitle}>
				<h1>
					¡Hola <span>{userData.user_name}</span>!
				</h1>
				<h5>Instructor n°: {userData.id}</h5>
			</div>
			<div className={Styles.instructorContainerCreate}>
				<p>¡Empieza, crea tu curso!</p>
				<Button text={"Crea tu curso"} onClick={handleNavigate} />
			</div>
			<div className={Styles.instructorContainerCourse}>
				<div>
					<h3>Tus cursos</h3>
				</div>
				{coursesCreated.map((course, index) => (
					<div key={index} className={Styles.courseContainer}>
						<div className={Styles.cardCourse}>
							<img src={course.image} alt={course.title} />
						</div>
						<div className={Styles.courseInfo}>
							<h2>{course.title}</h2>
							<div className={Styles.buttonContainer}>
								<Button text={"Crea clase"} />
								<Button text={"Editar curso"} />

								{course.onSale === true ? (
									<>
										<Button text={"Modificar descuento"} />
										<Button text={"Eliminar descuento"} />{" "}
									</>
								) : (
									<Button text={"Agregar descuento"} />
								)}
								<Button text={"Eliminar curso"} />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Instructor;
