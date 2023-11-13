const { User } = require("../../db");

const getAllUsersController = async () => {
	try {
		const users = await User.findAll();

		const cleanInfo = users.map((user) => {
			return {
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				user_name: user.user_name,
				id: user.id,
				enabled: user.enabled,
			};
		});
		return cleanInfo;
	} catch (error) {
		return "El error" + error;
	}
};

module.exports = { getAllUsersController };
