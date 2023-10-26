const {
	postCreateCourse,
} = require("../controllers/postControllers/postCreateCourse");


const postHandlerVideo = async (res, req) => {
	const { title, description, instructor_id, image, category } = req.body;
	try {
		const newCourse = await postCreateCourse(
			title,
			description,
			instructor_id,
			image,
			category
		);

		return res.status(200).json(newCourse);
			image,
			instructor_id,
			category
		);
		return res.status(201).json(newCourse);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { postHandlerCourse };
