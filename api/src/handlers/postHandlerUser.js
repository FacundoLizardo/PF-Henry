const {
	postCreateUser,
	postCreateUserGmail,
} = require("../controllers/postControllers/postCreateUser");

const postHandlerUser = async (req, res) => {
	console.log(req.body);
	if (req.body.emailVerified) {
		const {
			email,
			first_name,
			last_name,
			photoURL,
			role_instructor,
			role_student,
		} = req.body;

		if (
			!email ||
			!first_name ||
			!last_name ||
			!photoURL ||
			!role_instructor ||
			!role_student
		) {
			return res.status(400).json({ error: "Lack Of Data" });
		}

		try {
			let isNew = true;
			const newUser = await postCreateUserGmail(
				email,
				first_name,
				last_name,
				photoURL,
				role_instructor,
				role_student,
				isNew
			);

			return res.status(200).json(newUser);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	} else {
		const {
			user_name,
			email,
			password,
			first_name,
			last_name,
			birthdate,
			profile_picture,
			role_instructor,
			role_student,
		} = req.body;

		if (
			!user_name ||
			!email ||
			!password ||
			!first_name ||
			!last_name ||
			!birthdate ||
			!profile_picture ||
			!role_instructor ||
			!role_student
		) {
			return res.status(400).json({ error: "Lack Of Data" });
		}
		try {
			const newUser = await postCreateUser(
				user_name,
				email,
				password,
				first_name,
				last_name,
				birthdate,
				profile_picture,
				role_instructor,
				role_student
			);

			return res.status(200).json(newUser);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
};

module.exports = { postHandlerUser };
