import axios from "axios";

export const filterBack = async (params = "/") => {
  try {
    const data = response.data;
    const response = await axios.get(`/courses?${params.type}=${params.value}`);

    if (params !== "/") {
      localStorage.setItem(`${params.type}Courses`, JSON.stringify(data));
    }
  } catch (error) {
    console.log("Error en el front", error);
  }
};
