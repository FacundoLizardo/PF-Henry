import axios from "axios";
import style from "./Paybutton.module.css";

const PayButton = ({ text }) => {
	const user = JSON.parse(localStorage.getItem("userOnSession"));
	const cartItems = JSON.parse(localStorage.getItem("cart"));
	const handleCheckout = () => {
		axios
			.post(`/payment/create-checkout-session`, {
				cartItems,
				userId: user.id,
			})
			.then((response) => {
				if (response.data.url) {
					localStorage.setItem("payment", JSON.stringify(response.data));
					window.location.href = response.data.url;
				}
			})
			.catch((err) => console.log(err.message));
	};

	return (
		<>
			<button
				className={style.finalizePurchase}
				onClick={() => handleCheckout()}>
				{text}
			</button>
		</>
	);
};

export default PayButton;
