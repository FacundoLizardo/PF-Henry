import axios from "axios";

export async function postRating(course_id, user_id, rating, comment) {

    const { data } = axios.post("/rating/create", {
        course_id, user_id, rating, comment
    });
    if (data) {
        return data;
    }

}
