import axios from "axios";

export const getAllCategories = async () => {
	try {
		const response = await axios.get("/categories/");

		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = response.data;

		localStorage.setItem("categoriesData", JSON.stringify(data));

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};
