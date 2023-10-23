const server = require("./src/app.js");
const { conn } = require("./src/db.js");
// const { } = require("./src/db.js");
const port = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
	server.listen(3001, () => {
		console.log(`%Server listening at ${port}`);
	});
});
