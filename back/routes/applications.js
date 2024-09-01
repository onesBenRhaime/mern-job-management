// routes/applications.js
const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const JobOffer = require("../models/JobOffer");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const GMAIL_USER = "orangedigitalcentretest@gmail.com";
const GMAIL_PSW = "ylwvzbilzvcceuoa";
// Apply for a job offer
router.post("/", async (req, res) => {
	const { jobOfferId, userId } = req.body;

	try {
		// Validate job offer and user
		const jobOffer = await JobOffer.findById(jobOfferId);
		const user = await User.findById(userId);
		if (!jobOffer || !user) {
			return res.status(404).json({ msg: "Job offer or user not found" });
		}

		// Create a new application
		const newApplication = new Application({
			jobOffer: jobOfferId,
			jobSeeker: userId,
		});

		const application = await newApplication.save();
		// send a mail of notification to the  candidate that they have applied for the job offer with  nodemailer
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: GMAIL_USER,
				pass: GMAIL_PSW,
			},
		});
		let info = await transporter.sendMail({
			from: GMAIL_USER,
			to: user.email,
			subject: `Application for job offer`,

			html: ` <body>
        <table width="100%">
     
            <tr style="background: #fff">
                <td style="padding: 20px">
                    <p style="margin: 2; font-size: 14px; color: #000000">
                        <br /><br />
                        Dear ${user.name},<br /><br />
                        You have successfully applied for the job offer ${jobOffer.title} at ${jobOffer.company}.<br />
                        We will notify you once the employer reviews your application.<br /><br />
                        Best regards,<br />

                    </p>
                </td>
            </tr>
        </table>
    </body>`,
		});
		if (info) {
			console.log(info);
		} else {
			console.log("err");
		}

		res.json(application);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// Get all applications for a job seeker
router.get("/user/:userId", async (req, res) => {
	try {
		const applications = await Application.find({
			jobSeeker: req.params.userId,
		})
			.populate("jobOffer", "title company")
			.populate("jobSeeker", "name");
		res.json(applications);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// Get all applications for a job offer
router.get("/job/:jobOfferId", async (req, res) => {
	try {
		const applications = await Application.find({
			jobOffer: req.params.jobOfferId,
		})
			.populate("jobOffer", "title company")
			.populate("jobSeeker", "name");
		res.json(applications);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
