const { User } = require("../../db");

const getUserController = async (email) => {
	const data = await User.findOne({
		where: { email: email },
	});

	if (data === null) {
		return "User Not Founded";
	}

	return data.dataValues;
};

const putUserController = async (user) => {
	const data = await User.update(user, {
		where: { id: user.id },
	});

	if (!data) {
		return "User Not Founded";
	}

	return data[0];
};

module.exports = { getUserController, putUserController };
