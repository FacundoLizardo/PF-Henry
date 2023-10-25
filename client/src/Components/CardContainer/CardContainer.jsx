import Card from "../Card/Card";

import Styles from "./CardCantainer.module.css";

const CardContainer = ({ course }) => {
	console.log(course);
	return (
		<div className={Styles.cardContainer}>
			{course.map((course) => {
				return <Card course={course} />;
			})}
		</div>
	);
};

export default CardContainer;
