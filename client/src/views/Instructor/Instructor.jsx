import { useNavigate } from "react-router-dom";
import Styles from "./Instructor.module.css";
import Button from "../../Components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import updateCourse from "../../utils/updateCourse";
import { getAllCourses } from "../../utils/getAllCourses";
import Swal from "sweetalert2";

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
		console.log(value);
		if (value === true) {
			Swal.fire({
				title: "¿Seguro que quieres restaurar el curso?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#3d0dca",
				cancelButtonText: "Cancelar",
				confirmButtonText: "Aceptar",
				customClass: {
					popup: "mySwal",
				},
			}).then(async (result) => {
				if (result.isConfirmed) {
					await updateCourse(enableFalseCourse);
					await getAllCourses();
					updateData();
					Swal.fire({
						title: "Tu curso fue restaurado",
						icon: "success",
						customClass: {
							popup: "mySwal",
						},
					});
				}
			});
		}
		if (value === false) {
			Swal.fire({
				title: "¿Seguro que quieres eliminar el curso?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#3d0dca",
				cancelButtonText: "Cancelar",
				confirmButtonText: "Aceptar",
				customClass: {
					popup: "mySwal",
				},
			}).then(async (result) => {
				if (result.isConfirmed) {
					await updateCourse(enableFalseCourse);
					await getAllCourses();
					updateData();
					Swal.fire({
						title: "Tu curso fue eliminado",
						icon: "success",
						customClass: {
							popup: "mySwal",
						},
					});
				}
			});
		}
	};

	const openCloseModal = (id, string) => {
		if (string) {
			Swal.fire({
				title: "Modifica el descuento ingresando el nuevo porcentaje",
				text: "TEN EN CUENTA QUE SI INGRESAS 0 TU CURSO TENDRA EL PRECIO ORIGINAL",

				showCloseButton: true,
				icon: "warning",
				input: "number",
				inputLabel: "Porcentaje de descuento nuevo:",
				inputAttributes: {
					min: "0",
					max: "99",
				},
				inputValue: 0,
				customClass: {
					popup: "mySwal",
				},
			}).then(async (result) => {
				let newDataCourse;

				if (result.value === "0") {
					console.log("value 0");
					newDataCourse = {
						id: id,
						onSale: false,
						percentageDiscount: parseInt(result.value),
					};
				}
				if (result.value != "0") {
					newDataCourse = {
						id: id,
						onSale: true,
						percentageDiscount: parseInt(result.value),
					};
				}
				if (result.isConfirmed && newDataCourse.percentageDiscount >= 1) {
					console.log(newDataCourse);
					await updateCourse(newDataCourse);
					await getAllCourses();
					updateData();

					Swal.fire({
						title: "Se modifico el descuento de tu curso con exito!",
						icon: "success",
						customClass: {
							popup: "mySwal",
						},
					});
				}
				if (result.isConfirmed && newDataCourse.percentageDiscount === 0) {
					await updateCourse(newDataCourse);
					await getAllCourses();
					updateData();

					Swal.fire({
						title: "Se retiro tu curso de la lista de ofertas!",
						icon: "success",
						customClass: {
							popup: "mySwal",
						},
					});
				}
			});
		}
		if (!string) {
			Swal.fire({
				title: "Que porcentaje de descuento deseas agregar?",
				showCloseButton: true,
				validationMessage: "El porcentaje de descuento no puede ser 0",
				icon: "question",
				input: "number",
				inputLabel: "Porcentaje de descuento:",
				inputAttributes: {
					min: "1",
					max: "99",
				},
				inputValue: 0,
				customClass: {
					popup: "mySwal",
				},
			}).then(async (result) => {
				const newDataCourse = {
					id: id,
					onSale: true,
					percentageDiscount: parseInt(result.value),
				};
				if (result.isConfirmed) {
					await updateCourse(newDataCourse);
					await getAllCourses();
					updateData();

					Swal.fire({
						title: "Tu curso ahora esta en oferta!",
						icon: "success",
						customClass: {
							popup: "mySwal",
						},
					});
				}
			});
		}
	};
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
										<Button
											text={"Modificar descuento"}
											onClick={() => openCloseModal(course.id, "modificar")}
										/>
									</>
								) : (
									<Button
										text={"Agregar descuento"}
										onClick={() => openCloseModal(course.id)}
									/>
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
