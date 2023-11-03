const { Course, User } = require("../../db");

const postEnrollmentController = async (cart, id) => {
	const user = await User.findOne({ where: { id: id } });

	let results = [];
	for (i = 0; i < cart?.length; i++) {
		const course = await Course.findOne({ where: { id: cart[i].id } });
		const adding = await user.addCourse(course);
		results.push(adding);
	}

	return results;
};

module.exports = { postEnrollmentController };
