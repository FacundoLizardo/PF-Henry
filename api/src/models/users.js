const { DataTypes, Sequelize } = require("sequelize");

const Users = (sequelize) => {
    sequelize.define(
        'users',
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "nombre"
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "apellido"
            },
            birthdate: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            profile_picture: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            role_instructor: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            role_student: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            tableName: 'Users', // Cambia el nombre de la tabla si es necesario
            timestamps: false, // Si deseas habilitar timestamps, cambia esto a true
            freezeTableName: true, // Para evitar que Sequelize pluralice el nombre de la tabla
        }
    );
};


module.exports = Users;