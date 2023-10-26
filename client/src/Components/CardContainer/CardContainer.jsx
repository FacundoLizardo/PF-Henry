import Card from "../Card/Card";

import Styles from "./CardCantainer.module.css";

const CardContainer = ({ course }) => {
	return (
		<div className={Styles.cardContainer}>
			{course.map((course, index) => {
				return <Card key={index} course={course} />;
			})}
		</div>
	);
};

export default CardContainer;
