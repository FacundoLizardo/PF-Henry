import Styles from "./Button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <div className={Styles.buttonContainer}>
      <button className={Styles.cssButtonSharpBlue} onClick={onClick}>{text}</button>
    </div>
  );
};

export default Button;
