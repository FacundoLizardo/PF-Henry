import axios from "axios";

export const filterBack = async (params = "/") => {
	try {
		const data = response.data;
		const response = await axios.get(`/courses?${params.type}=${params.value}`);

		if (params !== "/") {
			localStorage.setItem(`${params.type}Courses`, JSON.stringify(data));
		}
	} catch (error) {
		throw new Error("Error en el front", error);
	}
};
