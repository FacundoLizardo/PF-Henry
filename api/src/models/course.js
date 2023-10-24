const { DataTypes } = require("sequelize");


const Course = (sequelize) => {
    sequelize.define(
        'Course',
        {
            course_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            instructor_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                foreingKey: true,
                allowNull: false
            },
            create_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            progress: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        
        {
            tableName: 'Course',
            timestamps: false,
            freezeTableName: true,
        }
    );
};

module.exports = Course;