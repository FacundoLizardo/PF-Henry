const { User, Course, Payment, Lesson, Rating } = require("../../db");

const getUserController = async (email) => {
	try {
		const user = await User.findOne({
			where: { email: email },
			include: [
				{
					model: Payment,
					include: [
						{
							model: Course,
							include: [
								{
									model: Lesson,
									as: "lesson",
								},
								{ model: Rating, as: "ratings" },
							],
						},
					],
				},
			],
		});

		if (!user) {
			return "User Not Found";
		}
		return user;
		// !Extraer la información relevante y reorganizarla (en proceso de revision, mañana 10 de nov reviso)
		const formattedUser = {
			id: user.id,
			user_name: user.user_name,
			first_name: user.first_name,
			last_name: user.last_name,
			name: user.name,
			email: user.email,
			photoURL: user.photoURL,
			birthdate: user.birthdate,
			role_student: user.role_student,
			role_instructor: user.role_instructor,
			courses: user.Payments?.reduce((courses, payment) => {
				// !Agregar cursos pagados al array
				courses.push(
					...payment.courses?.map((course) => {
						return {
							id: course.id,
							title: course.title,
							description: course.description,
							lessons: course.lesson?.map((lesson) => ({
								id: lesson.id,
								title: lesson.title,
							})),
						};
					})
				);
				return courses;
			}, []),
		};
		return formattedUser;
	} catch (error) {
		console.error(error);
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
