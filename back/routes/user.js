// routes/user.js
const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Get User Details
router.get("/me", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// Update User Profile
router.put("/me", auth, async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
			new: true,
		}).select("-password");
		res.json(updatedUser);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

//get all users for admin
router.get("/all", async (req, res) => {
	try {
		const users = await User.find().select("-password");
		res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

//asign role to user
router.put("/role/:userId", async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			{ role: req.body.role },
			{ new: true }
		).select("-password");
		res.json(updatedUser);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
//delete user
router.delete("/:userId", async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.userId);
		res.json({ msg: "User deleted" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
