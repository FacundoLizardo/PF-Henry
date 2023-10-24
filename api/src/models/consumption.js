const { DataTypes } = require("sequelize");

const Consumption = (sequelize) => {
    sequelize.define(
        'consumption',
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            course_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            lesson_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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