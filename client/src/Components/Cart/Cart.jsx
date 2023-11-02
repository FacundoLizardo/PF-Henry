import { useContext, useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Styles from "./Cart.module.css";

function Cart() {
  const userData = useContext(userContext);
  const { state, dispatch } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handleNavigateCart = () => {
    navigate(`./cart/${userData.id}`);
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const handleMouseEnter = () => {
    setIsModalOpen(true);
  };

  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const totalReducer = state.cart.reduce(
      (acc, product) => acc + product.price,
      0
    );
    const total = totalReducer.toFixed(2);
    setTotalPrice(total);
  }, [state.cart]);

  const isCartEmpty = state.cart.length === 0;

  return (
    <div
      className={Styles.cartContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isModalOpen && (
        <div className={Styles.modal}>
          <div className={Styles.modalContent}>
            {isCartEmpty ? (
              <p className={Styles.modalContentText}>El carrito está vacío</p>
            ) : (
              <ul>
                {state.cart.map((product, index) => (
                  <li key={index}>
                    <div>
                      <p>{product.name}</p>
                      <span>US$ {product.price}</span>
                    </div>
                    <button
                      className={Styles.cartRemoveItem}
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {!isCartEmpty && (
              <div className={Styles.totalPrice}>Total: US$ {totalPrice}</div>
            )}
            {isCartEmpty ? (
              <Button
                className={Styles.cartBuyItem}
                text={"Ir al carrito"}
                onClick={() => {
                  if (userData) {
                    handleNavigateCart();
                  } else {
                    handleNavigateLogin();
                  }
                }}
              />
            ) : (
              <button
                className={Styles.cartBuyItem}
                onClick={() => {
                  handleNavigateCart();
                }}
              >
                Ir a pagar
              </button>
            )}
          </div>
        </div>
      )}

      <button className={Styles.cartButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4zM4 5h10.7l-1.1 4l-8.4.9L4 5z"
          />
        </svg>{" "}
        {state.cart.length > 0 && (
          <span className={Styles.cartLength}>{state.cart.length}</span>
        )}
      </button>
    </div>
  );
}

export default Cart;
