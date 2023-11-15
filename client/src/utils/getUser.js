import axios from "axios";

export const getUser = async (email) => {
	console.log(email);
	try {
		const response = await axios.get(`/users/user?email=${email}`);

		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = response.data;
		console.log("data", data);
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};
