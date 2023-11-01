import axios from "axios";

export const getOnSaleCourses = async () => {
	try {
		const response = await axios.get("/onSale");

		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = response.data;
		console.log(data);
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};
