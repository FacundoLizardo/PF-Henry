const { DataTypes } = require("sequelize");

const Rating = (sequelize) => {
    sequelize.define(
        'Rating',
        {
            rating_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            course_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                foreingKey: true,
                allowNull: false
            },
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                foreingKey: true,
                allowNull: false
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false
            },
            create_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            tableName: 'Rating',
            timestamps: false,
            freezeTableName: true,

        }
    );
};

module.exports = Rating;