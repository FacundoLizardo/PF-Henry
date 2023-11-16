const { Course, Lesson, Rating, User } = require("../../db");
const { Op } = require("sequelize");

const applyFilters = async (category, page, rating) => {
	const limit = 10;
	const offset = (page - 1) * limit;

	let whereClause = {};
	let includeClauses = [
		{ model: Lesson, as: "lesson" },
		{ model: Rating, as: "ratings" },
	];

	if (category) {
		whereClause.category = { [Op.iLike]: `%${category}%` };
	}

	if (rating) {
		whereClause.rating = { [Op.gte]: rating };
	}

	const courses = await Course.findAll({
		where: whereClause,
		offset,
		limit,
		include: includeClauses,
	});

	const coursesWithInstructors = courses.map((course) => {
		const instructor = course.dataValues.instructor;
		const cleanedInstructor = instructor
			? {
					email: instructor.email,
					first_name: instructor.first_name,
					last_name: instructor.last_name,
					user_name: instructor.user_name,
					id: instructor.id,
					enabled: instructor.enabled,
			  }
			: null;

		return {
			...course.dataValues,
			dataInstructor: cleanedInstructor,
		};
	});

	return coursesWithInstructors;
};

module.exports = { applyFilters };
