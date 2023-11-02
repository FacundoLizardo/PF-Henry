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

import Styles from "./App.module.css";

// import { appFireBase } from "./firebase/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";

export const userContext = React.createContext();

function App() {
	const location = useLocation();

	const shouldShowFooter = () => {
		return ![
			"/student/",
			"/student/classList/",
			"/student/classList/lecture/",
			"/login",
			"/instructor/form",
			"/instructor/",
			"/detailCourse/",
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

	console.log(user);

	// onAuthStateChanged(auth, (userFireBase) => {
	// 	if (userFireBase) {
	// 		setUser(userFireBase);
	// 	} else {
	// 		setUser(null);
	// 	}
	// });

	const authenticatedRoutes = (
		<>
			<Route path="/student/:id" element={<Student />} />
			<Route path="/student/classList/:courseId" element={<ClassList />} />
			<Route
				path="/student/classList/lecture/:lessonId"
				element={<Lecture />}
			/>
		</>
	);

	const unauthenticatedRoutes = (
		<Route path="/" element={<Navigate to="/login/" />} />
	);

	return (
		<>
			<userContext.Provider value={user}>
				<div className={Styles.appContainer}>
					{location.pathname === "/login" ? "" : <NavBar />}
					<Routes>
						<Route path="/" element={<Layout />} />
						<Route path="/courses/" element={<Courses />} />
						<Route path="/detailCourse/:id" element={<DetailCourse />} />
						{user ? authenticatedRoutes : unauthenticatedRoutes}
						<Route path="/instructor/:id" element={<Instructor />} />
						<Route path="/instructor/:id/form" element={<Form />} />
						<Route path="/config/:id" element={<Config />} />
						<Route
							path="/login/"
							element={<Login updateContextUser={updateContextUser} />}
						/>
						<Route path="*" element={<Courses />} />
					</Routes>
					{shouldShowFooter() && <Footer />}
				</div>
			</userContext.Provider>
		</>
	);
}

export default App;
