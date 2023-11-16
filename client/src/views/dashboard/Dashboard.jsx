import style from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import Content from "./Content";
import { getAllUser } from "../../utils/getAllUser";
import { getAllCourses } from "../../utils/getAllCourses";
import { getAllPayments } from "../../utils/getAllPayments";
import axios from "axios";
import Swal from "sweetalert2";
import updateCourse from "../../utils/updateCourse";

export const Dashboard = ({ updateContextUser }) => {
	const [users, setUsers] = useState({});
	const [courses, setCourses] = useState({});
	const [payments, setPayments] = useState({});
	const [selectedButton, setSelectedButton] = useState("");

	useEffect(() => {
		const session = JSON.parse(localStorage.getItem("userOnSession"));
		if (session?.email !== "") {
			updateContextUser(session);
		}
		handleUsers();
		handleCourses();
		handlePayments();
	}, []);

	const handleButtonClick = (button) => {
		if (button === "Usuarios") {
			handleUsers();
			setSelectedButton(button);
		} else if (button === "Cursos") {
			setSelectedButton(button);
			handleCourses();
		} else if (button === "Pagos") {
			setSelectedButton(button);
			handlePayments();
		}
	};

	const handleUsers = async () => {
		const usuarios = await getAllUser();
		setUsers(usuarios);
	};

	const handleCourses = async () => {
		const courses = await getAllCourses();
		setCourses(courses);
	};

	const handlePayments = async () => {
		const payments = await getAllPayments();
		setPayments(payments);
	};

	const handleBlockUser = async (user) => {
		if (user.enabled === true) {
			Swal.fire({
				title: "¿Deseas bloquear al usuario en la plataforma?",
				icon: "question",
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
					const response = await axios.put("/users/user/edit", {
						...user,
						enabled: false,
					});
					if (response) {
						Swal.fire({
							title: "Este curso ha sido desbloqueado en Educastream",
							icon: "success",
							customClass: {
								popup: "mySwal",
							},
						});
					}
				}
				await handleUsers();
			});
			return;
		}

		if (user.enabled === false) {
			Swal.fire({
				title: "¿Deseas desbloquear a este usuario en la plataforma?",
				icon: "question",
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
					const response = await axios.put("/users/user/edit", {
						...user,
						enabled: true,
					});
					if (response) {
						Swal.fire({
							title: "Este usuario ha sido desbloqueado en Educastream",
							icon: "success",
							customClass: {
								popup: "mySwal",
							},
						});
					}
				}
				await handleUsers();
			});
			return;
		}
	};

	const handleBlockCourse = (course) => {
		if (course.enabled === true) {
			Swal.fire({
				title: "¿Quieres bloquear este curso en la plataforma?",
				icon: "question",
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
					const response = await updateCourse({
						...course,
						enabled: false,
						banned: true,
					});

					if (response) {
						Swal.fire({
							title: "Este curso ha sido bloqueado en Educastream",
							icon: "success",
							customClass: {
								popup: "mySwal",
							},
						});
					}
				}
				await handleCourses();
			});
			return;
		}
		if (course.enabled === false) {
			Swal.fire({
				title: "¿Quieres desbloquear este curso de la plataforma?",
				icon: "question",
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
					const response = await updateCourse({
						...course,
						enabled: true,
						banned: false,
					});

					if (response) {
						Swal.fire({
							title: "Este curso ha sido desbloqueado en Educastream",
							icon: "success",
							customClass: {
								popup: "mySwal",
							},
						});
					}
				}
				await handleCourses();
			});
			return;
		}
	};

	return (
		<div className={style.container}>
			<Sidebar onButtonClick={handleButtonClick} />
			<Content
				selectedButton={selectedButton}
				users={users}
				courses={courses}
				payments={payments}
				handleBlockUser={handleBlockUser}
				handleBlockCourse={handleBlockCourse}
			/>
		</div>
	);
};
