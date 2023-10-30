import axios from "axios";

export const getAllCategories = async () => {
	try {
		const response = await axios.get("/categories/");

		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = response.data;

		data.sort((a, b) => {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();

			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});

		localStorage.setItem("categoriesData", JSON.stringify(data));
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};
