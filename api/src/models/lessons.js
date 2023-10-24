const { DataTypes  } = require("sequelize");

const Lessons = (sequelize) => {
    sequelize.define(
     'lessons',
     {
    lesson_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    course_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    images:{
        type: DataTypes.STRING,
        allowNull: false
    },
    video_url:{
        type: DataTypes.STRING,
        allowNull: false
    },
    duration:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    sequence_order:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    create_at:{
        type: DataTypes.DATE,
            allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
            allowNull: false
    },
},
{
    tableName: 'Lessons',
    timestamps: false,
    freezeTableName: true,
}

);
}
module.exports = Lessons;