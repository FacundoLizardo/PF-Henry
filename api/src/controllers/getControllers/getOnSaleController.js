const { Course } = require("../../db");

const getOnSaleController = async () => {
	const onSaleCourses = await Course.findAll({
		where: {
			onSale: true,
		},
	});

	return onSaleCourses;
};

module.exports = { getOnSaleController };
