const { User, Course, Payment } = require("../../db");

const postEnrollmentController = async (cart, userId, id_payment) => {
	const user = await User.findOne({ where: { id: userId } });

	if (!cart?.length) {
		return { courses: [], payments: [] };
	}

	// !!!Busca los cursos que ya ha comprado el usuario!!!
	const existingPayments = await Payment.findAll({
		where: {
			UserId: userId,
		},
		attributes: ["courses"],
	});

	// !!!Convierte los cursos existentes en un arreglo de Cursos!!!
	const existingCourses = existingPayments.flatMap(
		(payment) => payment.courses
	);

	// !!!Filtra los cursos del carrito para eliminar los cursos que ya han sido comprados!!!!
	const filteredCart = cart.filter(
		(course) =>
			!existingCourses.some((existingCourse) => existingCourse.id === course.id)
	);
	// !!!Si el carrito filtrado está vacío, significa que todos los cursos ya han sido comprados!!!
	if (!filteredCart.length) {
		return {
			courses: [],
			payments: [],
			error: "Todos los cursos ya han sido comprados",
		};
	}

	// !!Acumular los cursos en el campo courses del pago!!!
	const courses = filteredCart.map((course) => ({
		id: course.id,
		name: course.name,
		description: course.description,
		image: course.image,
		price: course.price,
	}));
	const totalAmount = filteredCart.reduce(
		(acc, course) => acc + course.price,
		0
	);

	const [payment, created] = await Payment.findOrCreate({
		where: {
			UserId: userId,
			payment_id: id_payment,
		},
		defaults: {
			amount: totalAmount,
			payment_status: "Complete",
			payment_date: new Date(),
			payment_method: "Card",
		},
	});

	for (const course of filteredCart) {
		await payment.addCourse(course.id);
	}
	payment.courses = courses;

	await payment.save();

	return {
		courses: filteredCart,
		payments: [payment.dataValues],
	};
};

module.exports = { postEnrollmentController };
