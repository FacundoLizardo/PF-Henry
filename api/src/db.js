require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const CourseModel = require("./models/course");
const LessonModel = require("./models/lesson");
const PaymentModel = require("./models/payment");
const RatingModel = require("./models/rating");
const UserModel = require("./models/user");

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

const { Course, Lesson, Payment, Rating, User } = sequelize.models;

Course.hasMany(Lesson, { as: "course_lesson" });
Lesson.belongsTo(Course, { as: "lesson_course" });

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
