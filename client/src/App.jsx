import { Route, Routes } from "react-router-dom";

import Layout from "./views/Layout/Layout";
import NavBar from "./Components/NavBar/NavBar";
import DetailCourse from "./views/DetailCourse/DetailCourse";
import Courses from "./views/Courses/Courses";
import Student from "./views/Student/Student";
import Instructor from "./views/Instructor/Instructor";
import Lecture from "./views/Lecture/Lecture";
import Config from "./views/Config/Config";
import Form from "./views/Form/Form";

import Styles from "./App.module.css";

function App() {
	return (
		<div className={Styles.appContainer}>
			<NavBar />
			<Routes>
				<Route path="/" element={<Layout />} />
				<Route path="/detailCourse/:course_id" element={<DetailCourse />} />
				<Route path="/courses" element={<Courses />} />
				<Route path="/student" element={<Student />} />
				<Route path="/instructor" element={<Instructor />} />
				<Route path="/lecture" element={<Lecture />} />
				<Route path="/config" element={<Config />} />
				<Route path="/form" element={<Form />} />
			</Routes>
		</div>
	);
}

export default App;
