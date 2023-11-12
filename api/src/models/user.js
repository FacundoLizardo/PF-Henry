const { DataTypes } = require("sequelize");

const User = (sequelize) => {
	sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			user_name: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: "nombre",
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: "apellido",
			},
			birthdate: {
				type: DataTypes.DATEONLY,
				allowNull: true,
			},
			photoURL: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			role_instructor: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			role_student: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			isNew: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
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

module.exports = User;
