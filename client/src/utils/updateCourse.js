import axios from "axios";

const updateCourse = async (newDataCourse) => {
	const { image, id, title, enabled, onSale, percentageDiscount, banned } =
		newDataCourse;
	console.log(image, id, title, enabled, onSale, percentageDiscount, banned);
	try {
		const response = await axios.put(`/courses/edit`, newDataCourse);

		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = response.data;

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export default updateCourse;
