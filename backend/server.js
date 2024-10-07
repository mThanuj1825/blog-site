const conn = require("./connect");
const express = require("express");
const cors = require("cors");
const { postRoutes } = require("./postRoutes");
const { userRoutes } = require("./userRoutes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(postRoutes);
app.use(userRoutes);

app.listen(PORT, async () => {
	await conn.connectToServer();
});