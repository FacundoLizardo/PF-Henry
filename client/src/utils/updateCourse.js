import axios from "axios";

const updateCourse = async (newDataCourse) => {
	const { image, id, title, enabled, onSale, percentageDiscount } =
		newDataCourse;
	console.log(image, id, title, enabled, onSale, percentageDiscount);

	try {
		const response = await axios.put(`/courses/edit`, newDataCourse);
		console.log(response + "     respuesta de axios");

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

export default updateCourse;
