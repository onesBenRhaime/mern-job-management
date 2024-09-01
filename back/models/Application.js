// models/Application.js
const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
	jobOffer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "JobOffer",
		required: true,
	},
	jobSeeker: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	status: {
		type: String,
		enum: ["Applied", "Interview Scheduled", "Rejected", "Accepted"],
		default: "Applied",
	},
	appliedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Application", ApplicationSchema);
