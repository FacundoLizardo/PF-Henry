const { DataTypes } = require("sequelize");

const Consumption = (sequelize) => {
    sequelize.define(
        'Consumption',
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                foreingKey: true,
                allowNull: false
            },
            course_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                foreingKey: true,
                allowNull: false
            },
            lesson_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                foreingKey: true,
                allowNull: false
            },
            date_of_use: {
                type: DataTypes.DATE,
                allowNull: false
            },
        },
        {
            tableName: 'Consumption',
            timestamps: false,
            freezeTableName: true,
        }
    );
};

module.exports = Consumption;