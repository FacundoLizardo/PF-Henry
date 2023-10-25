import ReactPlayer from "react-player/youtube";
import Button from "../../Components/Button/Button";

import Styles from "./Lecture.module.css";

const Lecture = () => {
  return (
    <div className={Styles.lectureContainer}>
      <h2>Nombre del Curso</h2>
      <div className={Styles.descriptionClass}>
        <h3>Clase 1</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
          necessitatibus reiciendis animi fuga, quas iure numquam amet dicta,
          atque temporibus eos eligendi error. Saepe ipsam numquam pariatur
          voluptates hic atque.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
          necessitatibus reiciendis animi fuga, quas iure numquam amet dicta,
          atque temporibus eos eligendi error. Saepe ipsam numquam pariatur
          voluptates hic atque. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Minus, obcaecati! Aperiam cumque perspiciatis minima
          commodi soluta eveniet maiores eligendi ducimus beatae atque. Labore,
          aliquam nihil. Quae ratione assumenda adipisci veniam.
        </p>
      </div>
      <div className={Styles.videoContainer}>
        <div className={Styles.videoWrapper}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            controls
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
          />
        </div>
      </div>

      <div className={Styles.commentContainer}>
        <h3>Comentarios</h3>
        <div className={Styles.comment}>
          <div className={Styles.imgContainer}>
            <div className={Styles.commentImg}>L</div>
          </div>
          <div className={Styles.textContainer}>
            <textarea />
            <Button text="Comentar" onClick={""} />
          </div>
        </div>
        <div className={Styles.commentReady}>
          <div className={Styles.imgContainer}>
            <div className={Styles.commentImg}>L</div>
          </div>
          <div>
            <div className={Styles.commentReadyText}>
              <p>User_name</p>
              <p>Comentarios hechos</p>
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.navigation}>
        <div>
          <button>Anterior</button>
        </div>
        <div>
          <Button text="Me gusta" />
          <button>Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
