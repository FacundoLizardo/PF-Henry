import { useEffect } from "react";
import { postPaymentCart } from "../../utils/postPaymentCart";
import { useCart } from "../../context/CartContext";
import Styles from "./CheckOut.module.css";
import logo from "../../assets/logo.png";

export const CheckOut = ({ updateContextUser }) => {
  const payment = JSON.parse(localStorage.getItem("payment"));
  const { dispatch } = useCart();

  const enrollCourses = async (cart, id) => {
    const response = await postPaymentCart(cart, id);
    return response;
  };

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("userOnSession"));
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (session && session.id && Array.isArray(cart)) {
      updateContextUser(session);
      if (payment.payment) {
        console.log(cart);
        console.log(session.id);
        enrollCourses(cart, session.id)
          .then(() => {
            dispatch({ type: "CLEAR", payload: [] });
            window.location.reload;
          })
          .catch((error) => console.log("este es el error," + error));
      }
    } else {
      console.log(
        "Alguno de los datos o ambos son datos que no sirve para ser enviados al metodo del backend"
      );
    }
  }, []);

  return (
    <div className={Styles.containerCheckout}>
      {payment.payment ? (
        <div className={Styles.containerCheckoutok}>
          <h2>
            ¡Compra Exitosa!{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M10 20a10 10 0 0 1 0-20a10 10 0 1 1 0 20Zm-2-5l9-8.5L15.5 5L8 12L4.5 8.5L3 10l5 5Z"
              />
            </svg>
          </h2>
          <div className={Styles.text}>
            <p>
              Recibirás un correo electrónico con los detalles de tu compra y
              también encontrarás la información en tu bandeja de entrada.
            </p>
            <br />
            <p>
              Continúa comprando los mejores <a href="/courses">cursos</a>.
            </p>
            <br />
            <p>¡Gracias por elegirnos!</p>
            <br />
          </div>
          <div className={Styles.logo}>
            <img src={logo} alt={logo} />
          </div>
        </div>
      ) : (
        <div className={Styles.containerCheckoutError}>
          <h2>¡La operación no se ha completado con éxito!</h2>
        </div>
      )}
    </div>
  );
};
