const { DataTypes } = require("sequelize");

const Payment = (sequelize) => {
	sequelize.define(
		"Payment",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			payment_id: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			// course_id: {
			// 	type: DataTypes.UUID,
			// 	defaultValue: DataTypes.UUIDV4,
			// 	allowNull: false,
			// },
			amount: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			payment_status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			payment_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			payment_method: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};

module.exports = Payment;
