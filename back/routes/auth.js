// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult, check } = require("express-validator");

const User = require("../models/User");

const router = express.Router();

router.post(
	"/signup",
	[
		body("name", "Name is required").not().isEmpty(),
		body("email", "Please include a valid email").isEmail(),
		body("password", "Password must be at least 6 characters").isLength({
			min: 6,
		}),
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

			user = new User({
				name,
				email,
				password,
				role,
			});

			await user.save();
			const payload = {
				user: {
					id: user.id,
					role: user.role,
				},
			};

			jwt.sign(payload, "hGKhsdkKl", { expiresIn: "1h" }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

router.post(
	"/login",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			console.log("user:  ", user);

			if (!user) {
				return res.status(400).json({ msg: "Invalid Credentials" });
			}

			console.log("isMatch:  ", user.password === password);
			if (user.password !== password) {
				return res.status(200).json({ message: "Mot de passe incorrect " });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, "hGKhsdkKl", { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);
module.exports = router;
