const { DataTypes } = require("sequelize");

const Consumption = (sequelize) => {
	sequelize.define(
		"Consumption",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
			},
			course_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
			},
			lesson_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
			},
			deletedAt: {
				type: DataTypes.DATE,
				allowNull: true, // Para permitir registros no eliminados
			},
		},
		{
			timestamps: true,
			paranoid: true,
		}
	);
};

module.exports = Consumption;
