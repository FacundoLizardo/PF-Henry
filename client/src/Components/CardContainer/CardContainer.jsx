import Card from "../Card/Card";

import Styles from "./CardCantainer.module.css";

const CardContainer = ({ text }) => {
  return (
    <div className={Styles.cardContainer}>
      <Card text={text} />
    </div>
  );
};

export default CardContainer;
