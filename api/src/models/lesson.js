const { DataTypes } = require("sequelize");

const Lesson = (sequelize) => {
	sequelize.define(
		"Lesson",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
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
				type: DataTypes.TEXT,
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
			section: {
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
