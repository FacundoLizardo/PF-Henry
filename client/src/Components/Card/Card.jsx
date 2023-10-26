import Styles from "./Card.module.css";

const Card = ({ course }) => {
	return (
		<div className={Styles.cardContainer}>
			<img src={course.image} className={Styles.image}></img>

			<div className={Styles.contentContainer}>
				<img
					src={course.instructorImage}
					className={Styles.instructorImage}
				></img>
				<div className={Styles}>
					<h2>{course.title}</h2>
					<h3>{course.description}</h3>
				</div>
			</div>
			<h4>{course.rating}</h4>
		</div>
	);
};

export default Card;
