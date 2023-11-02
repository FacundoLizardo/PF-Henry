const { Course } = require("../../db");

const putCourseController = async (
	id,
	title,
	category,
	description,
	image,
	price
) => {
	const data = await Course.update(
		{ title, category, description, image, price },

		{
			where: { id: id },
		}
	);
	if (!data) {
		return "Course Not Founded";
	}

	return data[0];
};

module.exports = { putCourseController };
