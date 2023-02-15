const mongoose = require("mongoose");

const EncouragementSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
});

const EncouragementModel = mongoose.model(
	"encouragements",
	EncouragementSchema
);
module.exports = EncouragementModel;
