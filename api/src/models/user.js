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
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "nombre",
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "apellido",
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_instructor: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      role_student: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = User;
