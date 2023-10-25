const { DataTypes } = require("sequelize");

const Consumption = (sequelize) => {
  sequelize.define(
    "Consumption",
    {
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
      date_of_use: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true, // Para permitir registros no eliminados
      },
    },
    {
      tableName: "Consumption",
      timestamps: false,
      freezeTableName: true,
      paranoid: true,
    }
  );
};

module.exports = Consumption;
