const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

let postRoutes = express.Router();

// 1 - Create One
postRoutes.route("/posts").post(verifyToken, async (request, response) => {
	let db = database.getDb();
	let mongoObject = {
		title: request.body.title,
		description: request.body.description,
		content: request.body.content,
		image: request.body.image,
		author: request.body.user._id,
		dateCreated: request.body.dateCreated,
	};
	
	let data = await db.collection("posts").insertOne(mongoObject, (err) => {
		if (err) {
			console.error(err);
		}
	});
	response.json(data);
});

// 2 - Read All
postRoutes.route("/posts").get(verifyToken, async (request, response) => {
	let db = database.getDb();
	let data = await db.collection("posts").find({}, (err) => {
		if (err) {
			console.error(err);
		}
	}).toArray();
	
	if (data.length > 0) {
		response.json(data);
	} else {
		console.error("No posts found");
	}
});

// 3 - Read One
postRoutes.route("/posts/:id").get(verifyToken, async (request, response) => {
	let db = database.getDb();
	let id = new ObjectId(request.params.id);
	let data = await db.collection("posts").findOne({ _id: id }, (err) => {
		if (err) {
			console.error(err);
		}
	});
	
	if (Object.keys(data).length > 0) {
		response.json(data);
	} else {
		console.error(`No post found with id ${ id }.`);
	}
});

// 4 - Update One
postRoutes.route("/posts/:id").put(verifyToken, async (request, response) => {
	let db = database.getDb();
	let id = new ObjectId(request.params.id);
	let mongoObject = { $set: {} };
	
	if (request.body.title !== undefined) {
		mongoObject.$set.title = request.body.title;
	}
	if (request.body.description !== undefined) {
		mongoObject.$set.description = request.body.description;
	}
	if (request.body.content !== undefined) {
		mongoObject.$set.content = request.body.content;
	}
	if (request.body.image !== undefined) {
		mongoObject.$set.image = request.body.image;
	}
	if (request.body.author !== undefined) {
		mongoObject.$set.author = request.body.author;
	}
	if (request.body.dateCreated !== undefined) {
		mongoObject.$set.dateCreated = request.body.dateCreated;
	}
	
	let data = await db.collection("posts").updateOne({ _id: id }, mongoObject, (err) => {
		if (err) {
			console.error(err);
		}
	});
	response.json(data);
});

// 5 - Delete One
postRoutes.route("/posts/:id").delete(verifyToken, async (request, response) => {
	let db = database.getDb();
	let id = new ObjectId(request.params.id);
	let data = await db.collection("posts").deleteOne({ _id: id }, (err) => {
		if (err) {
			console.error(err);
		}
	});
	
	response.json(data);
});

function verifyToken(request, response, proceed) {
	const authHeaders = request.headers.authorization;
	const token = authHeaders && authHeaders.split(" ")[1];
	
	if (!token) {
		return response.status(401).json({
			message: "Authentication token not present.",
		});
	}
	
	jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
		if (err) {
			console.error(err);
			return response.status(403).json({
				message: "Invalid token.",
			});
		}
		
		request.body.user = user;
		proceed();
	});
}

module.exports = {
	postRoutes: postRoutes,
};