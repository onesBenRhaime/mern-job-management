import React from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobOfferList from "./components/JobOfferList";
import JobOfferDetails from "./components/JobOfferDetails";
import JobSeekerApplications from "./components/JobSeekerApplications";
import ApplyForJob from "./components/ApplyForJob";
import HomeDash from "./admin/HomeDash";
import HomePage from "./pages/HomePage";
import ListUsers from "./admin/ListUsers";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/admin" element={<HomeDash />} />
				<Route path="/users" element={<ListUsers />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/job-offers" element={<JobOfferList />} />
				<Route path="/job-offer/:id" element={<JobOfferDetails />} />
				<Route exact path="/apply/:jobOfferId" component={<ApplyForJob />} />
				<Route exact path="/:userId" element={<JobSeekerApplications />} />
			</Routes>
		</Router>
	);
}

export default App;
