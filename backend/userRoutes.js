const express = require("express");
const database = require("./connect");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config({ path: "./.env" });

let userRoutes = express.Router();
const SALT_ROUNDS = 6;

// 1 - Create One
userRoutes.route("/users").post(async (request, response) => {
	let db = database.getDb();
	
	const takenEmail = await db.collection("users").findOne({ email: request.body.email });
	
	if (takenEmail) {
		response.json({
			message: "Email already taken",
			success: false,
		});
	} else {
		const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);
		
		let mongoObject = {
			name: request.body.name,
			email: request.body.email,
			password: hash,
			joinDate: new Date(),
			posts: [],
		};
		
		let data = await db.collection("users").insertOne(mongoObject, (err) => {
			if (err) {
				console.error(err);
			}
		});
		response.json({ ...data, success: true });
	}
});

// 2 - Read All
userRoutes.route("/users").get(async (request, response) => {
	let db = database.getDb();
	let data = await db.collection("users").find({}, (err) => {
		if (err) {
			console.error(err);
		}
	}).toArray();
	
	if (data.length > 0) {
		response.json(data);
	} else {
		console.error("No users found.");
	}
});

// 3 - Read One
userRoutes.route("/users/:id").get(async (request, response) => {
	let db = database.getDb();
	let id = new ObjectId(request.params.id);
	let data = await db.collection("users").findOne({ _id: id }, (err) => {
		if (err) {
			console.error(err);
		}
	});
	
	if (Object.keys(data).length > 0) {
		response.json(data);
	} else {
		console.error(`No user found with id ${ id }.`);
	}
});

// 4 - Update One
userRoutes.route("/users/:id").put(async (request, response) => {
	let db = database.getDb();
	let id = new ObjectId(request.params.id);
	let mongoObject = { $set: {} };
	
	if (request.body.name !== undefined) {
		mongoObject.$set.name = request.body.name;
	}
	if (request.body.email !== undefined) {
		mongoObject.$set.email = request.body.email;
	}
	if (request.body.password !== undefined) {
		mongoObject.$set.password = request.body.password;
	}
	if (request.body["joinDate"] !== undefined) {
		mongoObject.$set.joinDate = request.body["joinDate"];
	}
	if (request.body["posts"] !== undefined) {
		mongoObject.$set.posts = request.body["posts"];
	}
	
	let data = await db.collection("users").updateOne({ _id: id }, mongoObject, (err) => {
		if (err) {
			console.error(err);
		}
	});
	response.json(data);
});

// 5 - Delete One
userRoutes.route("/users/:id").delete(async (request, response) => {
	let db = database.getDb();
	let id = new ObjectId(request.params.id);
	let data = await db.collection("users").deleteOne({ _id: id }, (err) => {
		if (err) {
			console.error(err);
		}
	});
	
	response.json(data);
});

// 6. Login
userRoutes.route("/users/login").post(async (request, response) => {
	let db = database.getDb();
	
	const user = await db.collection("users").findOne({ email: request.body.email });
	
	if (user) {
		let confirmation = await bcrypt.compare(request.body.password, user.password);
		
		if (confirmation) {
			const token = sign(user, process.env.SECRET_KEY, { expiresIn: "1h" });
			response.json({
				success: true,
				token: token,
			});
		} else {
			response.json({
				success: false,
				message: "Incorrect Password",
			});
		}
	} else {
		response.json({
			success: false,
			message: "User not found",
		});
	}
});

module.exports = {
	userRoutes: userRoutes,
};