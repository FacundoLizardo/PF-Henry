const {
	postCreateUser,
	postCreateUserGmail,
} = require("../controllers/postControllers/postCreateUser");

const postHandlerUser = async (req, res) => {
	let isNew = true;
	if (req.body.emailVerified) {
		const {
			email,
			first_name,
			last_name,
			photoURL,
			role_instructor,
			role_student,
			enabled,
		} = req.body;

		if (
			!email ||
			!first_name ||
			!last_name ||
			!photoURL ||
			!role_instructor ||
			!role_student ||
			!enabled
		) {
			return res.status(400).json({ error: "Lack Of Data" });
		}

		try {
			const newUser = await postCreateUserGmail(
				email,
				first_name,
				last_name,
				photoURL,
				role_instructor,
				role_student,
				enabled,
				isNew
			);
			return res.status(200).json(newUser);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	} else {
		const { email, password, photoURL, role_instructor, role_student } =
			req.body;
		const enabled = false;
		if (!email || !password || !photoURL || !role_instructor || !role_student) {
			return res.status(400).json({ error: "Lack Of Data" });
		}
		try {
			const newUser = await postCreateUser(
				email,
				password,
				photoURL,
				role_instructor,
				role_student,
				enabled,
				isNew
			);

			return res.status(200).json(newUser);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
};

module.exports = { postHandlerUser };
