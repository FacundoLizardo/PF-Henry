import Styles from "./Button.module.css";

const Button = ({ text }) => {
  return (
    <div className={Styles.buttonContainer}>
      <div>{text}</div>
    </div>
  );
};

export default Button;
