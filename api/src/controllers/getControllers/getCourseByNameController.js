const { Op } = require("sequelize");
const { Course, Lesson, Rating, User } = require("../../db");

const getCourseByNameController = async (propiedad, valorPropiedad) => {
	let condicion;

	if (propiedad === "category") {
		condicion = { [Op.eq]: valorPropiedad };
	} else {
		condicion = { [Op.iLike]: `%${valorPropiedad}%` };
	}

	const data = await Course.findAll({
		where: {
			[propiedad]: condicion,
		},
		include: [
			{ model: Lesson, as: "lesson" },
			{ model: Rating, as: "ratings" },
		],
	});

	const courseData = await Promise.all(
		data.map(async (course) => {
			const instructor_id = course.instructor_id;
			const instructor = await User.findByPk(instructor_id);
			if (course.enabled && instructor.enabled) {
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
					dataInstructor: cleanedInstructor || null,
				};
			} else {
				return null;
			}
		})
	);
	return courseData.filter((elemento) => elemento !== null);
	// courses.map((elemento) => {
	// 	return elemento.dataValues;
	// });
};

module.exports = { getCourseByNameController };
