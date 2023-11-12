const { Course, User, Category } = require("../../db");

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
		const existCat = await Category.findOne({
			where: {
				name: category,
			},
		});

		const [course, created] = await Course.findOrCreate({
			where: { title: title },
			defaults: {
				description,
				instructor_id,
				image,
				category,
				price,
				sections,
				enabled: true,
			},
		});

		const instructor = await User.findByPk(instructor_id);

		if (instructor) {
			await course.addUser(instructor);
		}

		if (existCat) {
			await course.setCategory(existCat);
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
