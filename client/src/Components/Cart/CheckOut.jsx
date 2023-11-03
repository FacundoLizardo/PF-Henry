import { useEffect } from "react";
import styles from "./Cart.module.css";
import { postPaymentCart } from "../../utils/postPaymentCart";

export const CheckOut = ({ updateContextUser }) => {
	const payment = JSON.parse(localStorage.getItem("payment"));

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
						localStorage.removeItem("cart");
						localStorage.removeItem("payment");
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
		<>
			{payment.payment ? (
				<div className={styles.container_checkout}>
					<h2>Checkout Satifactorio!!</h2>
					<h1>Te llegara un correo electronico con la compra que realizaste</h1>
					<p>Esta informacion tambien sera enviada tu correo</p>
					<p>Muchas gracias por preferirnos</p>
					<br />
					<h2>EducaStream Team</h2>
				</div>
			) : (
				<div className={styles.container_checkout}>
					<h2 style={{ color: "red" }}>
						No existe ninguna compra satifactoria
					</h2>
				</div>
			)}
		</>
	);
};
