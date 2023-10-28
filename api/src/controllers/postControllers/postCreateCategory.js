const { Category } = require("../../db");

const postCreateCategory = async (name) => {
	try {
		const [category, created] = await Category.findOrCreate({
			where: { name: name },
			defaults: {
				name: name,
			},
		});
		if (created) {
			return { category, created };
		} else return { category, created };
	} catch (error) {
		return error;
	}
};

module.exports = { postCreateCategory };
