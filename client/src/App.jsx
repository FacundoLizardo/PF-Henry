/* eslint-disable */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./views/Layout/Layout";
import NavBar from "./Components/NavBar/NavBar";
import DetailCourse from "./views/DetailCourse/DetailCourse";
import Courses from "./views/Courses/Courses";
import Student from "./views/Student/Student";
import Instructor from "./views/Instructor/Instructor";
import Lecture from "./views/Lecture/Lecture";
import Config from "./views/Config/Config";
import ClassList from "./views/ListClass/ClassList";
import Form from "./views/Form/Form";
import Login from "./views/Login/Login";
import Footer from "./Components/Footer/Footer";
import EditCourse from "./views/EditCourse/EditCourse";
// import { appFireBase } from "./firebase/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import CartPage from "./views/CartPage/CartPage";

import Styles from "./App.module.css";
import { useEffect } from "react";
export const userContext = React.createContext();

function App() {
	const location = useLocation();
	const [logged, setLogged] = useState(false);
	const shouldShowFooter = () => {
		return ![
			"/student/",
			"/student/classList/",
			"/student/classList/lecture/",
			"/login",
			"/instructor/form",
			"/instructor/",
			"/detailCourse/",
			"/config/",
		].includes(location.pathname);
	};

	const updateContextUser = (newUser) => {
		setUser(newUser);
	};
	const [user, setUser] = useState({
		email: "",
		password: "",
		isNew: 0,
	});

	useEffect(() => {
		const session = JSON.parse(localStorage.getItem("userOnSession"));
		if (session) {
			setLogged(!logged);
		}
	}, []);

	// console.log(logged);
	const authenticatedRoutes = (
		<>
			<Route
				path="/student/:id"
				element={<Student updateContextUser={updateContextUser} />}
			/>
			<Route path="/student/classList/:courseId" element={<ClassList />} />
			<Route
				path="/student/classList/lecture/:lessonId"
				element={<Lecture />}
			/>
			<Route
				path="/config/:id"
				element={<Config updateContextUser={updateContextUser} />}
			/>
			<Route
				path="/cart/:id"
				element={<CartPage updateContextUser={updateContextUser} />}
			/>
			<Route
				path="/instructor/:id"
				element={<Instructor updateContextUser={updateContextUser} />}
			/>
			<Route
				path="/instructor/:id/form"
				element={<Form updateContextUser={updateContextUser} />}
			/>
			<Route
				path="/edit/:id"
				element={<EditCourse updateContextUser={updateContextUser} />}
			/>
		</>
	);

	const unauthenticatedRoutes = (
		<Route path="/" element={<Navigate to="/login" />} />
	);

	return (
		<>
			<userContext.Provider value={user}>
				<div className={Styles.appContainer}>
					{location.pathname === "/login" ? "" : <NavBar />}
					<Routes>
						<Route
							path="/"
							element={<Layout updateContextUser={updateContextUser} />}
						/>
						<Route
							path="/courses/"
							element={<Courses updateContextUser={updateContextUser} />}
						/>
						<Route path="/detailCourse/:id" element={<DetailCourse />} />
						{logged ? authenticatedRoutes : unauthenticatedRoutes}

						<Route
							path="/login/"
							element={<Login updateContextUser={updateContextUser} />}
						/>
						<Route path="*" element={<Navigate to="/courses/" />} />
					</Routes>
					{shouldShowFooter() && <Footer />}
				</div>
			</userContext.Provider>
		</>
	);
}

export default App;
