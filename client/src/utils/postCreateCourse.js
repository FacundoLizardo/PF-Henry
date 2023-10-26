import axios from "axios";

export async function sendData(course) {
	try {
		const { data } = await axios.post(
			"/courses/create",
			course
		);

		if (data) {
			window.alert("Se anadio tu curso con exito");
		}
	} catch (error) {
		window.alert("Hay informacion erronea");
	}
}
