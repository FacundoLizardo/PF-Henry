const {
	getAllCategoriesController,
} = require("../controllers/getControllers/getAllCategoriesController");

const getHandlerCategories = async (req, res) => {
	try {
		const result = await getAllCategoriesController();

		if (!result) {
			return res.status(200).json({ message: "Not Categories Found" });
		}
		return res.status(200).json(result);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { getHandlerCategories };
