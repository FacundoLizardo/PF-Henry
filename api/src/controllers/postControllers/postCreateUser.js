const { User } = require("../../db");
const { sendEmailUser } = require("../../utils/mailing");

const postCreateUser = async (
	email,
	password,
	photURL,
	role_instructor,
	role_student,
	enabled,
	isNew
) => {
	try {
		const [user, created] = await User.findOrCreate({
			where: { email: email },
			defaults: {
				password,
				photURL,
				role_instructor,
				role_student,
				enabled,
				isNew,
			},
		});
		if (created) {
			sendEmailUser(user.id, email)
				.then((result) =>
					console.log(`mensaje de verificacion enviado, ${result}`)
				)
				.catch((error) =>
					console.log(
						`error al enviar mail, igual se creo el user, error: ${error}`
					)
				);
			return user;
		} else
			return "User not created cause it already exist or something is wrong, please try again";
	} catch (error) {
		return error;
	}
};

const postCreateUserGmail = async (
	email,
	first_name,
	last_name,
	photoURL,
	role_instructor,
	role_student,
	enabled,
	isNew
) => {
	try {
		const [user, created] = await User.findOrCreate({
			where: { email: email },
			defaults: {
				first_name,
				last_name,
				photoURL,
				role_instructor,
				role_student,
				enabled,
				isNew,
			},
		});

		if (created) {
			return user;
		} else return user;
	} catch (error) {
		return error;
	}
};

module.exports = { postCreateUser, postCreateUserGmail };
