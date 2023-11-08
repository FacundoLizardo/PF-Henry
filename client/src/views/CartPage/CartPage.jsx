import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import Styles from "./CartPage.module.css";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import PayButton from "../../Components/PayButton/Paybutton";
import Swal from "sweetalert2";

const CartPage = () => {
  const { state, dispatch } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar el curso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3d0dca",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      customClass: {
        popup: "mySwal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "El curso fue eliminado del carrito",
          icon: "success",
          customClass: {
            popup: "mySwal",
          },
        });
        dispatch({ type: "REMOVE_FROM_CART", payload: productId });
      }
    });
  };

  const handleNavigate = () => {
    navigate("./courses");
  };

  useEffect(() => {
    const totalReducer = state.cart.reduce(
      (acc, product) => acc + product.price,
      0
    );
    const total = Math.round(totalReducer * 100) / 100;
    setTotalPrice(total);
  }, [state.cart]);

  return (
    <div className={Styles.cartPageContainer}>
      <div className={Styles.cartPageTop}>
        <div className={Styles.cartPageInfo}>
          <h2>Tus productos</h2>
          <div className={Styles.content}>
            <ul>
              {state.cart.length === 0 ? (
                <div className={Styles.contentSelect}>
                  <p>
                    Tu carrito de compras está vacío. Encuentra tus cursos
                    favoritos <a href={"/courses"}>aquí</a>.
                  </p>
                </div>
              ) : (
                state.cart.map((product, index) => (
                  <li key={index}>
                    <div className={Styles.contentImg}>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className={Styles.contentText}>
                      <h3>{product.name}</h3>
                      <button
                        className={Styles.cartRemoveItem}
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 15 15"
                        >
                          <path
                            fill="currentColor"
                            d="M.877 7.5a6.623 6.623 0 1 1 13.246 0a6.623 6.623 0 0 1-13.246 0ZM7.5 1.827a5.673 5.673 0 1 0 0 11.346a5.673 5.673 0 0 0 0-11.346Zm2.354 3.32a.5.5 0 0 1 0 .707L8.207 7.5l1.647 1.646a.5.5 0 0 1-.708.708L7.5 8.207L5.854 9.854a.5.5 0 0 1-.708-.708L6.793 7.5L5.146 5.854a.5.5 0 0 1 .708-.708L7.5 6.793l1.646-1.647a.5.5 0 0 1 .708 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className={Styles.cartPageSummary}>
          <div>
            <h2>Resumen de compra</h2>
            <div>
              <ul>
                {state.cart.map((product, index) => (
                  <li key={index}>
                    <div>
                      <p>{product.name}</p>
                      <span>US$ {product.price}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={Styles.totalPrice}>
            Total a pagar: US$ {totalPrice}
          </div>
        </div>
      </div>
      <div className={Styles.bottonBuy}>
        <Button text={"Volver"} onClick={handleNavigate} />
        {state.cart.length === 0 ? (
          <PayButton disabled={true} text={"Finalizar Compra"} />
        ) : (
          <PayButton text={"Finalizar Compra"} />
        )}
      </div>
    </div>
  );
};

export default CartPage;
