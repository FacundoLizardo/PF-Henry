const { DataTypes } = require("sequelize");

const Rating = (sequelize) => {
  sequelize.define(
    "Rating",
    {
      rating_id: {
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
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      create_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true, // Para permitir registros no eliminados
      },
    },
    {
      tableName: "Rating",
      timestamps: false,
      freezeTableName: true,
      paranoid: true,
    }
  );
};

module.exports = Rating;
