const {
	getAllPaymentController,
} = require("../controllers/getControllers/getAllPaymentController");

const getHandlerAllPayments = async (req, res) => {
	try {
		const payments = await getAllPaymentController();
		if (payments) {
			return res.status(200).json(payments);
		} else {
			return res.status(404).json({
				error: "Error al traer todos los pagos",
			});
		}
	} catch (error) {
		return res.status(400).json({
			error: "No se envió correctamente la información al servidor",
		});
	}
};

module.exports = { getHandlerAllPayments };
