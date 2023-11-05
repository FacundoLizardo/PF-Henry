const { DataTypes } = require("sequelize");

const Course = (sequelize) => {
	sequelize.define(
		"Course",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			instructor_id: {
				type: DataTypes.UUID,
				allowNull: true,
			},
			progress: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			category: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: true,
				validate: {
					isFloat: {
						args: [0, 999999.99],
						msg: "El precio debe tener como máximo dos decimales.",
					},
				},
			},
			onSale: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			percentageDiscount: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			enabled: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
		},

		{
			timestamps: true,
		}
	);
};

module.exports = Course;
