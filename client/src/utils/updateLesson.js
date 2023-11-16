import axios from "axios";

const updateLesson = async (newDataLesson) => {
	try {
		const response = await axios.put(`/lessons/edit`, newDataLesson);
		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = response.data;
		return data;
	} catch (error) {
		console.error(error.message);
		throw error;
	}
};

export default updateLesson;
