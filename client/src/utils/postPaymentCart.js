import axios from "axios";

export async function postPaymentCart(cart, id) {
	try {
		const { data } = await axios.post("payment/enrollment", { cart, id });
		if (data) {
			return data;
		}
	} catch (error) {
		window.alert("Error en la pasarela de pago");
	}
}
