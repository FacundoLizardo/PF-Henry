import Card from "../Card/Card";

import Styles from "./CardCantainer.module.css";

const CardContainer = ({ course, handleNavigate }) => {
  return (
    <div className={Styles.cardContainer}>
      <Card course={course} handleNavigate={handleNavigate}/>
    </div>
  );
};

export default CardContainer;
