import Styles from "./Button.module.css";

const Button = ({ text, onClick }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className={Styles.buttonContainer}>
      <button
        className={Styles.cssButtonSharpBlue}
        onClick={() => {
          onClick();
          scrollToTop();
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
