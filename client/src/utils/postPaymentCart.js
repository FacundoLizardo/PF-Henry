import axios from "axios";

export async function postPaymentCart(cart, id, email) {
	try {
		const { data } = await axios.post("payment/enrollment", {
			cart,
			id,
			email,
		});
		if (data) {
			return data;
		}
	} catch (error) {
		window.alert("Error en la pasarela de pago");
	}
}
