const {
	getOnSaleController,
} = require("../controllers/getControllers/getOnSaleController");

const getHandlerOnSale = async (req, res) => {
	try {
		const courses = await getOnSaleController();
		return res.status(200).json(courses);
	} catch (error) {
		return res.status(400).json({
			error: error.message + " No hay cursos con descuento en este momento",
		});
	}
};

module.exports = { getHandlerOnSale };
