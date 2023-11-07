/* eslint-disable no-case-declarations */
import { createContext, useContext, useEffect, useReducer } from "react";
import { ADD_TO_CART, CLEAR, REMOVE_FROM_CART } from "./CartTypes";
import Swal from "sweetalert2/dist/sweetalert2.js";

const CartContext = createContext();

const initialState = {
	cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const Toast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 2000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
});

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const isCourseInCart = state.cart.find(
				(product) => product.id === action.payload.id
			);

			if (isCourseInCart) {
				Toast.fire({
					icon: "warning",
					title: "¡El curso ya existe!",
					customClass: {
						popup: "mySwal",
					},
				});
				return state;
			}

			Toast.fire({
				icon: "success",
				title: "¡Curso agregado al carrito con éxito!",
				customClass: {
					popup: "mySwal",
				},
			});

			return {
				...state,
				cart: [...state.cart, action.payload],
			};

		case REMOVE_FROM_CART:
			const updatedCart = state.cart.filter(
				(product) => product.id !== action.payload
			);

			Swal.fire({
				title: "¿Seguro que quieres eliminar el curso?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3d0dca",
				cancelButtonColor: "#d33",
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
					});
				}
			});

			return {
				...state,
				cart: updatedCart,
			};

		case CLEAR:
			return {
				...state,
				cart: action.payload,
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
