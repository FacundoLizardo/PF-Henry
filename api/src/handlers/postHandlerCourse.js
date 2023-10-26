const {
	postCreateCourse,
} = require("../controllers/postControllers/postCreateCourse");

const postHandlerCourse = async (req, res) => {
	const { title, description, instructor_id, category, image } = req.body;

	if (!title || !description || !instructor_id || !category || !image) {
		return res.status(400).json({ error: "Lack Of Data" });
	}
	//Comment Prueba
	try {
		const newCourse = await postCreateCourse(
			title,
			description,
			instructor_id,
			image,
			category
		);

		return res.status(200).json(newCourse);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { postHandlerCourse };
