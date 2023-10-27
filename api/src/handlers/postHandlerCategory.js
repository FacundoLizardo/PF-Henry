const {
	postCreateCategory,
} = require("../controllers/postControllers/postCreateCategory");

const postHandlerCategory = async (req, res) => {
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ error: "Lack Of Data" });
	}

	try {
		const category = await postCreateCategory(name);

		if (category.created) {
			return res.status(200).send(category);
		} else {
			return res
				.status(200)
				.json({
					message: "Category Not Created, It already exist ",
					created: category.created,
				});
		}
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = { postHandlerCategory };
