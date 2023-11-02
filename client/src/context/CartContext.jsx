/* eslint-disable no-case-declarations */
import { createContext, useContext, useEffect, useReducer } from "react";
import { ADD_TO_CART, REMOVE_FROM_CART } from "./CartTypes";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
    
      const isCourseInCart = state.cart.find(
        (product) => product.id === action.payload.id
      );

      if (isCourseInCart) {
        return state;
      }

      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_FROM_CART:
      const updatedCart = state.cart.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe utilizarse dentro de un CartProvider");
  }

  return context;
};
