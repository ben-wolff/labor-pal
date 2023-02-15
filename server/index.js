const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const EncouragementModel = require("./models/Encouragements");
const GuessModel = require("./models/Guesses");

app.use(express.json());
app.use(cors());

mongoose.connect(
	"mongodb+srv://admin:vVVOwTDpFImA1hKN@cluster0.1p8voyc.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/encouragement", (req, res) => {
	EncouragementModel.count().exec((err, count) => {
		const random = Math.floor(Math.random() * count);

		EncouragementModel.findOne()
			.skip(random)
			.exec((err, result) => {
				console.log(result);
				res.send(result);
			});
	});
});

app.post("/submitEncouragement", async (req, res) => {
	const encouragement = req.body;

	const newEncouragement = new EncouragementModel(encouragement);
	await newEncouragement.save();

	res.json(newEncouragement);
});

app.post("/submitGuess", async (req, res) => {
	const guess = req.body;

	const newGuess = new GuessModel(guess);
	await newGuess.save();

	res.json(newGuess);
});

app.get("/guesses", (req, res) => {
	GuessModel.find().exec((err, result) => {
		res.send(result);
	});
});

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.listen(4000, () => {
	console.log("SERVER IS RUNNING!");
});
