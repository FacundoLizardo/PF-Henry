const { DataTypes } = require("sequelize");

const Category = (sequelize) => {
	sequelize.define(
		"Category",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			enabled: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
		},
		{
			timestamps: false,
		}
	);
};
module.exports = Category;
