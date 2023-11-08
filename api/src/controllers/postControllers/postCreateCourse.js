const { Course, User } = require("../../db");

const postCreateCourse = async (
	title,
	description,
	instructor_id,
	image,
	category,
	price,
	sections
) => {
	try {
		const enabled = true;
		const [course, created] = await Course.findOrCreate({
			where: { title: title },
			defaults: {
				description,
				instructor_id,
				image,
				category,
				price,
				sections,
				enabled,
			},
		});

		const instructor = await User.findByPk(instructor_id);

		if (instructor) {
			course.addUser(instructor);
		}

		if (created) {
			return course;
		} else
			return "Course not created cause it already exist or something is wrong, please try again";
	} catch (error) {
		return error;
	}
};

module.exports = { postCreateCourse };
