import Button from "../Button/Button";
import Styles from "./Card.module.css";

const Card = ({ text }) => {
  return (
    <div className={Styles.cardContainer}>
      <div>{text}</div>
      <Button text={"Button"} />
    </div>
  );
};

export default Card;
