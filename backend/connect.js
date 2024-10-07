const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./.env" });

const client = new MongoClient(process.env.ATLAS_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

let database;

module.exports = {
	connectToServer: async () => {
		try {
			await client.connect();
			database = client.db("blogData");
		} catch (err) {
			throw new Error(err);
		}
	},
	getDb: () => {
		if (!database) {
			throw new Error("Did not get the Database.");
		}
		
		return database;
	},
};