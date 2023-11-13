require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

const CourseModel = require("./models/course");
const LessonModel = require("./models/lesson");
const PaymentModel = require("./models/payment");
const RatingModel = require("./models/rating");
const UserModel = require("./models/user");
const CategoryModel = require("./models/category");
//const ConsumptionModel = require("./models/consumption");

const { DB_USER, DB_PASSWORD, DB_HOST, DBURL } = process.env;

const sequelize = new Sequelize(

	   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/educastream`, 
	//  DBURL,
	{ 

		logging: false,
		native: false,
		dialectModule: pg,
	}
);

CourseModel(sequelize);
LessonModel(sequelize);
PaymentModel(sequelize);
RatingModel(sequelize);
UserModel(sequelize);
CategoryModel(sequelize);
//ConsumptionModel(sequelize);

const { Course, Lesson, Payment, Rating, User, Category } = sequelize.models;

//Cursos con Lecciones
Course.hasMany(Lesson, { as: "lesson" });
Lesson.belongsTo(Course);

//Cursos con Ratings
Course.hasMany(Rating, { as: "ratings" });
//Rating.belongsTo(Course, { foreignKey: "course_id" });
Rating.belongsTo(Course);

User.hasMany(Rating);
//Rating.belongsTo(User, { foreignKey: "user_id" });
Rating.belongsTo(User);

//Cursos con Categorias
Category.hasMany(Course);
Course.belongsTo(Category);

// Courses con payments y usuarios para tener mejor la info.
User.belongsToMany(Course, { through: "Consumption" });
Course.belongsToMany(User, { through: "Consumption" });
Course.belongsToMany(Payment, {
	through: "PaymentCourse",
	foreignKey: "course_id",
});
Payment.belongsToMany(Course, {
	through: "PaymentCourse",
	foreignKey: "payment_id",
});

User.hasMany(Payment);
Payment.belongsTo(User);

//Lesson.hasOne(Course);

// //Cursos con consumo
// Course.hasMany(Consumption, { as: "course_consumption" });
// Consumption.belongsTo(Course, { foreignKey: "id", as: "consumption_course" });
// //Cursos con Pagos
// Course.hasMany(Payment, { as: "course_payment" });
// Payment.belongsTo(Course, { foreingKey: "id", as: "payment_course" });

// //Cursos con Rating
// Course.hasMany(Rating, { as: "course_rating" });
// Rating.belongsTo(Course, { foreingKey: "id", as: "rating_course" });

// //Lecciones con Consumo
// Lesson.hasMany(Consumption, { as: "lesson_consumption" });
// Consumption.belongsTo(Lesson, { foreingKey: "id", as: "consumption_lesson" });

// //Usuarios con Consumo
// User.hasMany(Consumption, { as: "user_consumption" });
// Consumption.belongsTo(User, { foreingKey: "id", as: "consumption_user" });

// //Usuarios con Pagos
// User.hasMany(Payment, { as: "user_payment" });
// Payment.belongsTo(User, { foreingKey: "id", as: "payment_user" });

// //Usuarios con Rating
// User.hasMany(Rating, { as: "user_rating" });
// Rating.belongsTo(User, { foreingKey: "id", as: "rating_user" });

// // Relacion Lessons con Tabla Intermedia Comsumption
// Lesson.belongsTo(Consumption, {
// 	foreignKey: "lesson_id",
// });

module.exports = {
	Category,
	Course,
	Lesson,
	Payment,
	Rating,
	User,
	conn: sequelize,
};
