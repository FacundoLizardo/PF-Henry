import { useNavigate } from "react-router-dom";
import Styles from "./Instructor.module.css";
import Button from "../../Components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import updateCourse from "../../utils/updateCourse";

const Instructor = ({ updateContextUser }) => {
	const userData = useContext(userContext);
	const navigate = useNavigate();
	const [dataCourses, setDataCourses] = useState();

	const updateData = () => {
		setDataCourses(JSON.parse(localStorage.getItem("coursesData")));
	};
	useEffect(() => {
		updateData();
		const session = JSON.parse(localStorage.getItem("userOnSession"));
		if (session?.email !== "") {
			updateContextUser(session);
		}
	}, []);

	const coursesCreated = dataCourses
		? dataCourses.filter(
				(item) => item.instructor_id === userData?.id && item.enabled === true
		  )
		: [];

	const enabledCourses = dataCourses
		? dataCourses.filter(
				(item) => item.instructor_id === userData?.id && item.enabled === false
		  )
		: [];

	const handleNavigate = (destination) => {
		navigate(destination);
	};

	const enableRestoreCourse = async (id, value) => {
		const enableFalseCourse = {
			id: id,
			enabled: value,
		};
		await updateCourse(enableFalseCourse);
		updateData();
		navigate(`/instructor/${userData?.id}`);
		//window.location.reload;
	};
	console.log(dataCourses);
	console.log(coursesCreated);
	console.log(enabledCourses);
	return (
		<div className={Styles.instructorContainer}>
			<div className={Styles.instructorContainerTitle}>
				<h1>
					¡Hola <span>{userData?.user_name}</span>!
				</h1>
				<h5>Instructor n°: {userData?.id}</h5>
			</div>
			<div className={Styles.instructorContainerCreate}>
				<p>¡Empieza, crea tu curso!</p>
				<Button
					text={"Crea tu curso"}
					onClick={() => handleNavigate(`/instructor/${userData?.id}/form`)}
				/>
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
								<Button
									text={"Crea clases"}
									onClick={() =>
										handleNavigate(`/instructor/${course.id}/createLecture`)
									}
								/>
								<Button
									text={"Editar curso"}
									onClick={() => handleNavigate(`/edit/${course.id}`)}
								/>

								{course.onSale === true ? (
									<>
										<Button text={"Modificar descuento"} />
										<Button text={"Eliminar descuento"} />{" "}
									</>
								) : (
									<Button text={"Agregar descuento"} />
								)}
								<Button
									text={"Eliminar curso"}
									onClick={() => enableRestoreCourse(course.id, false)}
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className={Styles.disabledCourses}>
				<div>
					<h3>Tus cursos eliminados</h3>
				</div>
				{enabledCourses.map((course, index) => (
					<div key={index} className={Styles.courseContainer}>
						<div className={Styles.cardCourse}>
							<img src={course.image} alt={course.title} />
						</div>
						<div className={Styles.courseInfo}>
							<h2>{course.title}</h2>
							<div className={Styles.buttonContainer}>
								<Button
									text={"Editar curso"}
									onClick={() => handleNavigate(`/edit/${course.id}`)}
								/>

								{course.onSale === true ? (
									<>
										<Button text={"Modificar descuento"} />
										<Button text={"Eliminar descuento"} />{" "}
									</>
								) : (
									<Button text={"Agregar descuento"} />
								)}
								<Button
									text={"Restaurar curso"}
									onClick={() => enableRestoreCourse(course.id, true)}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Instructor;
