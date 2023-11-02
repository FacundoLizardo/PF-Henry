import axios from "axios";

export const postUser = async (user) => {
	try {
		const response = await axios.post(
			`http://localhost:3001/users/create`,
			user
		);

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
