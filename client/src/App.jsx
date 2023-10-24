
import Layout from "./views/Layout/Layout";
import NavBar from "./Components/NavBar/NavBar";
import DetailCourse from "./views/DetailCourse/DetailCourse";
import Courses from "./views/Courses/Courses";

import { Route, Routes, useLocation } from "react-router-dom";

import Styles from "./App.module.css";

function App() {
  const location = useLocation();

  return (
    <div className={Styles.appContainer}>
      {location.pathname === "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/detailCourse/:course_id" element={<DetailCourse />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  );
}

export default App;
