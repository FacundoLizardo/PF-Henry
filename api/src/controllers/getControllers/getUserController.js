const { User, Course, Payment, Lesson } = require("../../db");

const getUserController = async (email) => {
	try {
		const user = await User.findOne({
			where: { email: email },
			include: [
				{
					model: Payment,
					through: "UserPayment",
					include: [
						{
							model: Course,
							include: [
								{
									model: Lesson,
									as: "lesson",
								},
							],
						},
					],
				},
			],
		});

		if (!user) {
			return "User Not Found";
		}

		const transformedUser = {
			...user.toJSON(),
			courses: user.Payments.map((payment) => ({
				paymentId: payment.id,
				course: payment.Courses.map((course) => course.toJSON()),
			})),
		};

		return transformedUser;
		return user;
		// const enrollments = user.Payments.map((payment) => {
		// 	const courses = payment.Courses.map((course) => {
		// 		return {
		// 			id: course.id,
		// 			title: course.title,
		// 			price: course.price,
		// 			description: course.description,
		// 		};
		// 	});

		// 	return {
		// 		paymentId: payment.id, // Agrega aquí las propiedades relevantes de los pagos si es necesario
		// 		courses: courses,
		// 	};
		// });

		// const userWithEnrollments = {
		// 	user: {
		// 		...user.dataValues,
		// 		enrollments: enrollments,
		// 	},
		// };

		// console.log(userWithEnrollments);
		return user;
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
