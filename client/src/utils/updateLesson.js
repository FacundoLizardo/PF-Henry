import axios from "axios";

const updateLesson = async (newDataLesson) => {
	const { id, title, description, video_url, duration, section } =
		newDataLesson;
	console.log(id, title, description, video_url, duration, section);

	try {
		const response = await axios.put(`/lessons/edit`, newDataLesson);
		console.log(response + "     respuesta de axios");

		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = response.data;

		console.log(data);
		return data;
	} catch (error) {
		console.error(error.message);
		throw error;
	}
};

export default updateLesson;
