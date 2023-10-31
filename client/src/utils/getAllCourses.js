import axios from "axios";
import Swal from "sweetalert2";

export const getAllCourses = async () => {
	try {
		const response = await axios.get("/courses/");

		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = response.data;

		localStorage.setItem("coursesData", JSON.stringify(data));

		console.log(data);
		return data;
	} catch (error) {
		Swal.fire({
			title: "Error al conectar con la base de datos",
			text: "Gracias por usar Educastream",
			icon: "error",
			confirmButtonText: "Cerrar",
		});
		throw error;
	}
};
