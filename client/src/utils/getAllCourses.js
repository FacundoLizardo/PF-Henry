import axios from "axios";

export const getAllCourses = async () => {
	try {
		const response = await axios.get("/courses");

		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = response.data;

		data.sort((a, b) => {
			const fechaA = new Date(a.createdAt);
			const fechaB = new Date(b.createdAt);
			return fechaB - fechaA;
		});

		localStorage.setItem("coursesData", JSON.stringify(data));

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};
