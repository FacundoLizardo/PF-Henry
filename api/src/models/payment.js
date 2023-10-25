const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const Payment = (sequelize) => {
  sequelize.define(
    "Payment",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      payment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true, // Para permitir registros no eliminados
      },
    },
    {
      tableName: "Payment",
      timestamps: false,
      freezeTableName: true,
      paranoid: true,
    }
  );
};

module.exports = Payment;
