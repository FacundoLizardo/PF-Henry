import axios from "axios";

export const getAllUser = async () => {
    try {
        const response = await axios.get(`/users/all`);

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.data;
        localStorage.setItem("allUser", JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};