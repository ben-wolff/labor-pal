const mongoose = require("mongoose");

const GuessSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	guessTime: {
		type: String,
		required: true,
	},
	guessedAt: {
		type: String,
		required: true,
	},
});

const GuessModel = mongoose.model("guesses", GuessSchema);
module.exports = GuessModel;
