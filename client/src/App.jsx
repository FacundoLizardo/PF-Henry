import { Route, Routes } from "react-router-dom";
import LoginButton from "./views/Login/Login";
import LogoutButton from "./views/Logout/Logout";
// import Profile from "./views/Profile/Profile";
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

import Styles from "./App.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
	const {isAuthenticated} = useAuth0()

	return (
		<div className={Styles.appContainer}>
			{location.pathname === "/login" ? "" : <NavBar />}
			{isAuthenticated ? <LogoutButton /> : <LoginButton />}
			{/* <Profile/> */}
			<Routes>
				<Route path="/" element={<Layout />} />
				<Route path="/detailCourse/:course_id" element={<DetailCourse />} />
				{/* <Route path="/login" element={<Login />} /> */}
				<Route path="/courses" element={<Courses />} />
				<Route path="/student" element={<Student />} />
				<Route path="/instructor" element={<Instructor />} />
				<Route path="/lecture/:lessonId" element={<Lecture />} />
				<Route path="/config" element={<Config />} />
				<Route path="/classList/:courseId" element={<ClassList />} />
				<Route path="/form" element={<Form />} />
			</Routes>
		</div>
	);
}

export default App;
