import { useNavigate } from "react-router-dom";
import Styles from "./Card.module.css";
import Button from "../Button/Button";

const Card = ({ course }) => {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/detailCourse/${course.id}`);
	};

	const generateStars = (rating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				stars.push(<span key={i} className={Styles.starFilled}></span>);
			} else {
				stars.push(<span key={i} className={Styles.star}></span>);
			}
		}
		return stars;
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
					<div className={Styles.contentBottomPrice}>{course.price}</div>
				</div>
				<div className={Styles.contentFooter}>
					<div>
						{course.rating} {generateStars(course.rating)}
					</div>
					<Button text={"Agregar"} />
				</div>
			</div>
		</div>
	);
};

export default Card;
