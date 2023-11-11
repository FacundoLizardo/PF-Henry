import axios from "axios";

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`/users/user?id=${id}`);

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