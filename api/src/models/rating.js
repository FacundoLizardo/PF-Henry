const { DataTypes } = require("sequelize");

const Rating = (sequelize) => {
	sequelize.define(
		"Rating",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},/*
			course_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				unique: "user_course",
			},
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
				unique: "user_course",
			},*/
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			comment: {
				type: DataTypes.STRING(200),
				allowNull: true,
			},
		},
		{
			timestamps: true,
		}
	);
};

module.exports = Rating;
