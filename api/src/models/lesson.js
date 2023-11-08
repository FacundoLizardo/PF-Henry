const { DataTypes } = require("sequelize");

const Lesson = (sequelize) => {
	sequelize.define(
		"Lesson",
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
			video_url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			wasLook: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			sequence_order: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
module.exports = Lesson;
