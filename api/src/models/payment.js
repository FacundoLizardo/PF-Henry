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
			courses: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: [],
			},
			amount: {
				type: DataTypes.FLOAT,
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
