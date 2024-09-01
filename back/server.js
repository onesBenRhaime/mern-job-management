// server.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const applicationRoutes = require("./routes/applications");
const jobOffersRoutes = require("./routes/jobOffers");

app.use(cors());
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/jobOffers", jobOffersRoutes);
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
