const {
	postCreateCourse,
} = require("../controllers/postControllers/postCreateCourse");

const postHandlerCourse = async (req, res) => {
	const {
		title,
		description,
		instructor_id,
		category,
		image,
		price,
		sections,
	} = req.body;

	if (
		!title ||
		!description ||
		!instructor_id ||
		!category ||
		!image ||
		!price ||
		!sections
	) {
		return res.status(404).json({ error: "Lack Of Data" });
	}
	try {
		const newCourse = await postCreateCourse(
			title,
			description,
			instructor_id,
			image,
			category,
			price,
			sections
		);
		console.log(newCourse);

		return res.status(200).json(newCourse);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { postHandlerCourse };
