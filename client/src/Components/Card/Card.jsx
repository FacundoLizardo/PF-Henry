import Styles from "./Card.module.css";

const Card = ({ course, handleNavigate }) => {
  const handleCardClick = () => {
    handleNavigate(course.course_id);
  };

  return (
    <div className={Styles.cardContainer}>
      <div className={Styles.imgContainer} onClick={handleCardClick}>
        <img src={course.image} />
      </div>
      <div className={Styles.contentContainer}>
        <div className={Styles.contentTop}>
          <h4>{course.title}</h4>
        </div>
        <div className={Styles.contentBottom}>
          <p>{course.description}</p>
        </div>
        <div>{course.rating}</div>
      </div>
    </div>
  );
};

export default Card;
