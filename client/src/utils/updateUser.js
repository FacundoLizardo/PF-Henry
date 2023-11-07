import axios from "axios";

export const updateUser = async (user) => {
	try {
		const response = await axios.put(`/users/user/edit`, user);

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
