import style from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import Content from "./Content";
import { getAllUser } from "../../utils/getAllUser";
import { getAllCourses } from "../../utils/getAllCourses";
import { getAllPayments } from "../../utils/getAllPayments";

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
		console.log(courses);
		console.log(users);
		console.log(payments);
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

	return (
		<div className={style.container}>
			<Sidebar onButtonClick={handleButtonClick} />
			<Content
				selectedButton={selectedButton}
				users={users}
				courses={courses}
				payments={payments}
			/>
		</div>
	);
};
