import Card from "../Card/Card";

import Styles from "./CardCantainer.module.css";

const CardContainer = ({ course }) => {
  return (
    <div className={Styles.cardContainer}>
      <Card course={course} />
    </div>
  );
};

export default CardContainer;
