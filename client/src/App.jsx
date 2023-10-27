import { Route, Routes, useLocation } from "react-router-dom";

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

import Styles from "./App.module.css";
import Footer from "./Components/Footer/Footer";

function App() {
	const location = useLocation();

	const shouldShowFooter = () => {
		return ![
			"/student",
			"/lecture",
			"/login",
			"/instructor/form",
			"/instructor",
			"/courses/detailCourse/:id",
		].includes(location.pathname);
	};
	return (
		<>
			<div className={Styles.appContainer}>
				{location.pathname === "/login" ? "" : <NavBar />}
				<Routes>
					<Route path="/" element={<Layout />} />
					<Route path="/detailCourse/:course_id" element={<DetailCourse />} />
					<Route path="/login" element={<Login />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/student" element={<Student />} />
					<Route path="/instructor" element={<Instructor />} />
					<Route path="/lecture/:lessonId" element={<Lecture />} />
					<Route path="/config" element={<Config />} />
					<Route path="/classList/:courseId" element={<ClassList />} />
					<Route path="/instructor/form" element={<Form />} />
					<Route path="*"></Route>
				</Routes>
				{shouldShowFooter() && <Footer />}
			</div>
		</>
	);
}

export default App;
