const { Course, User } = require("../../db");

const postCreateUser = async (
	user_name,
	email,
	password,
	first_name,
	last_name,
	birthdate,
	profile_picture,
	role_instructor,
	role_student
) => {
	try {
		const [user, created] = await User.findOrCreate({
			where: { user_name: user_name },
			defaults: {
				email,
				password,
				first_name,
				last_name,
				birthdate,
				profile_picture,
				role_instructor,
				role_student,
			},
		});

		if (created) {
			return user;
		} else
			return "User not created cause it already exist or something is wrong, please try again";
	} catch (error) {
		return error;
	}
};

module.exports = { postCreateUser };
