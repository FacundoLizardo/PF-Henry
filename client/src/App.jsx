import Layout from "./views/Layout/Layout";
import NavBar from "./Components/NavBar/NavBar";
import DetailCourse from "./views/DetailCourse/DetailCourse";
import Courses from "./views/Courses/Courses";

import { Route, Routes } from "react-router-dom";

import Styles from "./App.module.css";

function App() {
  return (
    <div className={Styles.appContainer}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/detailCourse/:course_id" element={<DetailCourse />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  );
}

export default App;
