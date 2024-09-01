// routes/jobOffers.js
const express = require("express");
const JobOffer = require("../models/JobOffer");
const router = express.Router();

// Get all job offers
router.get("/", async (req, res) => {
	try {
		//get all job offers from the database
		const jobOffers = await JobOffer.find();
		//send the job offers as a response
		console.log(jobOffers.length);

		return res.json(jobOffers);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// Get a specific job offer by ID
router.get("/:id", async (req, res) => {
	try {
		const jobOffer = await JobOffer.findById(req.params.id);
		if (!jobOffer) {
			return res.status(404).json({ msg: "Job offer not found" });
		}
		res.json(jobOffer);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

//add a new job offer and return  all job offers after adding the new one
router.post("/", async (req, res) => {
	try {
		const newJobOffer = new JobOffer(req.body);
		await newJobOffer.save();
		const jobOffers = await JobOffer.find();
		return res.json(jobOffers);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
