const { DataTypes } = require("sequelize");

const Course = (sequelize) => {
  sequelize.define(
    "Course",
    {
      course_id: {
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
      instructor_id: {
        type: DataTypes.UUID,
        //defaultValue: DataTypes.UUIDV4,-> No generar en forma automática
        allowNull: false,
      } /*
      create_at: {
        type: DataTypes.DATE,
        //allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        //allowNull: false,
      },*/,
      progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true, // Para permitir registros no eliminados
      },
    },

    {
      tableName: "Course",
      timestamps: false,
      freezeTableName: true,
      paranoid: true,
    }
  );
};

module.exports = Course;
