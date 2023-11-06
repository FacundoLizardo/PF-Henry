const { User, Course } = require("../../db");

const getUserController = async (email) => {
	try {
		const user = await User.findOne({
			where: { email: email },
			include: {
				model: Course,
				through: { attributes: [] },
			},
		});

		if (!user) {
			return "User Not Found";
		}

		const courses = user.Courses.map((course) => course.dataValues);
		const userWithPurchasedCourses = {
			...user.dataValues,
			Courses: courses,
		};
		console.log(userWithPurchasedCourses);
		return userWithPurchasedCourses;
	} catch (error) {
		console.error(error);
		return "Error fetching user data";
	}
};

const putUserController = async (user) => {
	const data = await User.update(user, {
		where: { id: user.id },
	});

	if (!data) {
		return "User Not Founded";
	}

	return data[0];
};

module.exports = { getUserController, putUserController };
