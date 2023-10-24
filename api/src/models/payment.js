const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const Payment = (sequelize) => {
  sequelize.define(
    "Payment",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        foreingKey: true,
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
        foreingKey: true,
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
    },
    {
      tableName: "Payment",
      timestamps: false,
      freezeTableName: true,
    }
  );
};

module.exports = Payment;
