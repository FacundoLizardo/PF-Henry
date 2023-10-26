export const getAllCourses = async () => {
    try {
        const response = await fetch()

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json()
        console.log(data);
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}