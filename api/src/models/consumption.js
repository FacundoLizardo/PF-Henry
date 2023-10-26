// const { DataTypes } = require("sequelize");

// const Consumption = (sequelize) => {
// 	sequelize.define(
// 		"Consumption",
// 		{
// 			id: {
// 				type: DataTypes.UUID,
// 				defaultValue: DataTypes.UUIDV4,
// 				primaryKey: true,
// 				allowNull: false,
// 			},
// 			course_id: {
// 				type: DataTypes.UUID,
// 				allowNull: false,
// 				references: {
// 					model: "Course",
// 					key: "id",
// 				},
// 			},
// 			user_id: {
// 				type: DataTypes.UUID,
// 				allowNull: false,
// 				references: {
// 					model: "User",
// 					key: "id",
// 				},
// 			},
// 		},
// 		{
// 			timestamps: true,
// 			paranoid: true,
// 		}
// 	);
// };

// module.exports = Consumption;
