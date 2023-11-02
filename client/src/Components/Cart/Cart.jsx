import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Styles from "./Cart.module.css";

function Cart() {
  const { state, dispatch } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ul>
        {state.cart.map((product, index) => (
          <li key={index} className={Styles.cartItem}>
            {product.name} - ${product.price}
            <button
              className={Styles.cartRemoveItem}
              onClick={() => handleRemoveFromCart(product.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      {state.cart.length > 0 && (
        <div>
          <button className={Styles.cartBuyItem} onClick={openModal}>
            Comprar
          </button>
          {isModalOpen && (
            <div className={Styles.modal}>
              <div className={Styles.modalContent}>
                <span className="close-button" onClick={closeModal}>
                  &times;
                </span>
                <h2>Resumen de compra</h2>
                <ul>
                  {state.cart.map((product, index) => (
                    <li key={index} className={Styles.cartItem}>
                      {product.name} - ${product.price}
                    </li>
                  ))}
                </ul>
                <button className={Styles.cartBuyItem} onClick={closeModal}>
                  Confirmar Compra
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
