import ReactPlayer from "react-player";
import Button from "../../Components/Button/Button";
import { useLocation } from "react-router-dom";

import Styles from "./Lecture.module.css";
import { useEffect } from "react";

const Lecture = ({ updateContextUser }) => {
  const { state } = useLocation();
  const lesson = state;
  console.log("leccion", lesson);
  const video = lesson.video_url;

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("userOnSession"));
    if (session?.email !== "") {
      updateContextUser(session);
    }
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={Styles.lectureContainer}>
      <header>
        <div>
          <h2>{lesson && lesson.title}</h2>
        </div>
        <div className={Styles.headerButton}>
          <Button text="Volver" onClick={handleGoBack} />
        </div>
      </header>
      <div className={Styles.descriptionClass}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
          necessitatibus reiciendis animi fuga, quas iure numquam amet dicta,
          atque temporibus eos eligendi error. Saepe ipsam numquam pariatur
          voluptates hic atque.
        </p>
      </div>
      <div className={Styles.videoContainer}>
        <ReactPlayer url={video} controls />
      </div>
    </div>
  );
};

export default Lecture;
