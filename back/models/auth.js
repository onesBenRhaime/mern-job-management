// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const config = require("config");

const router = express.Router();

// Sign Up
router.post(
	"/signup",
	[
		body("name").not().isEmpty(),
		body("email").isEmail(),
		body("password").isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password, role } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: "User already exists" });
			}

			user = new User({ name, email, password, role });
			await user.save();

			const payload = { user: { id: user.id, role: user.role } };
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: "1h" },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

// Login
router.post(
	"/login",
	[body("email").isEmail(), body("password").exists()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: "Invalid Credentials" });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ msg: "Invalid Credentials" });
			}

			const payload = { user: { id: user.id, role: user.role } };
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: "1h" },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;
