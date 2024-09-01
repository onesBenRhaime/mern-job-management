const mongoose = require("mongoose");

const JobOfferSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	company: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("JobOffer", JobOfferSchema);
