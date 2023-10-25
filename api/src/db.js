require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const CourseModel = require("./models/course");
const LessonModel = require("./models/lesson");
const PaymentModel = require("./models/payment");
const RatingModel = require("./models/rating");
const UserModel = require("./models/user");
const ConsumptionModel = require("./models/consumption");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/educastream`,
  {
    logging: false,
    native: false,
  }
);

// const sequelize = new Sequelize(DB_DEPLOY, {
// 	logging: false, // set to console.log to see the raw SQL queries
// 	native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

/*
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
*/

CourseModel(sequelize);
LessonModel(sequelize);
PaymentModel(sequelize);
RatingModel(sequelize);
UserModel(sequelize);
ConsumptionModel(sequelize);

const { Course, Lesson, Payment, Rating, User, Consumption } = sequelize.models;

//Cursos con Lecciones
Course.hasMany(Lesson, { as: "course_lesson" });
Lesson.belongsTo(Course, { foreignKey: "course_id", as: "lesson_course" });

//Cursos con consumo
Course.hasMany(Consumption, { as: "course_consumption" });
Consumption.belongsTo(Course, {foreignKey:"course_id", as: "consumption_course" });

//Cursos con Pagos
Course.hasMany(Payment, {as: "course_payment"});
Payment.belongsTo(Course, {foreingKey:"course_id",as: "payment_course"});

//Cursos con Rating
Course.hasMany(Rating, {as: "course_rating"});
Rating.belongsTo(Course, {foreingKey: "course_id",as: "rating_course"});

//Lecciones con Consumo
Lesson.hasMany(Consumption, {as: "lesson_consumption"});
Consumption.belongsTo(Lesson, {foreingKey:"lesson_id", as: "consumption_lesson"});

//Usuarios con Consumo
User.hasMany(Consumption, {as: "user_consumption"});
Consumption.belongsTo(User, {foreingKey:"user_id",as: "consumption_user"});

//Usuarios con Pagos
User.hasMany(Payment, {as: "user_payment"});
Payment.belongsTo(User, {foreingKey:"user_id",as: "payment_user"});

//Usuarios con Rating
User.hasMany(Rating, {as: "user_rating"});
Rating.belongsTo(User, {foreingKey:"user_id",as: "rating_user"});


module.exports = {
  Course,
  Lesson,
  Payment,
  Rating,
  User,
  conn: sequelize,
};
/*
module.exports = {
	...sequelize.models,
	conn: sequelize,
};
*/
