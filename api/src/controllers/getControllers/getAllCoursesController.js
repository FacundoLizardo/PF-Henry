const { Course, Lesson, Rating, User } = require("../../db");

const getAllCoursesController = async () => {
	const data = await Course.findAll({
		include: [
			{ model: Lesson, as: "lesson" },
			{ model: Rating, as: "ratings" },
		],
	});

	const courseData = await Promise.all(data.map(async (course) => {
		const instructor_id = course.instructor_id;
		const instructor = await User.findByPk(instructor_id);
		const cleanedInstructor = {
			email: instructor.email,
			first_name: instructor.first_name,
			last_name: instructor.last_name,
			user_name: instructor.user_name,
			id: instructor.id,
			enabled: instructor.enabled,
		};
		return {
			...course.dataValues,
			dataInstructor: cleanedInstructor ? cleanedInstructor : null,
		};
	}));

	return courseData;
};

module.exports = { getAllCoursesController };
