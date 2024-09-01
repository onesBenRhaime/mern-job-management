// src/components/JobSeekerApplications.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Footer from "./Footer";
import Header from "./Auth/Header";
const JobSeekerApplications = () => {
	const [applications, setApplications] = useState([]);
	const token = localStorage.getItem("token");
	let userId = null;
	if (token) {
		try {
			const decodedToken = jwtDecode(token); // Corrected function name
			userId = decodedToken?.user?.id;
			console.log(userId);
		} catch (error) {
			console.error("Invalid token:", error.message);
			// Handle invalid token case here if needed
		}
	}
	useEffect(() => {
		const fetchApplications = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/applications/user/${userId}`
				);
				setApplications(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchApplications();
	}, [userId]);

	return (
		<>
			<Header />
			<main id="main ">
				<section id="services" className="section section-bg pt-28">
					<div className="p-4">
						<h1 className="text-2xl font-bold mb-4">Your Applications</h1>
						<ul>
							{applications.map((app) => (
								<li key={app._id} className="border p-4 mb-2 rounded shadow-sm">
									<h2 className="text-xl font-semibold">
										{app.jobOffer.title}
									</h2>
									<p>Company: {app.jobOffer.company}</p>
									<p>Status: {app.status}</p>
									<p>
										Applied At: {new Date(app.appliedAt).toLocaleDateString()}
									</p>
								</li>
							))}
						</ul>
					</div>
				</section>{" "}
			</main>
			<Footer />
		</>
	);
};

export default JobSeekerApplications;
