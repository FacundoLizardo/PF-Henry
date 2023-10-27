const { Category } = require("../../db");

const getAllCategoriesController = async () => {
	try {
		const data = await Category.findAll();

		const totalData = data.map((category) => category.dataValues);

		return totalData;
	} catch (error) {
		return error;
	}
};
module.exports = { getAllCategoriesController };
