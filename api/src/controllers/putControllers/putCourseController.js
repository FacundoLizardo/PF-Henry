const { Course } = require("../../db");

const putCourseController = async (
	id,
	title,
	category,
	description,
	image,
	price,
	enabled,
	onSale,
	percentageDiscount,
	banned
) => {
	const data = await Course.update(
		{
			title,
			category,
			description,
			image,
			price,
			enabled,
			onSale,
			percentageDiscount,
			banned,
		},

		{
			//aca hay que poner otra condicion, que este disponible el curso (que no este "borrado")...
			where: { id: id },
		}
	);
	if (!data) {
		return "Course Not Founded";
	}

	return data[0];
};

module.exports = { putCourseController };
