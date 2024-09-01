// src/components/JobOfferDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobOfferById } from "../services/jobOfferService";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import Footer from "./Footer";
import Header from "./Auth/Header";

const JobOfferDetails = () => {
	const [jobOffer, setJobOffer] = useState(null);
	const [status, setStatus] = useState("");
	const { id } = useParams();

	// Get token from local storage and decode it to get the user id
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
		const fetchJobOffer = async () => {
			const data = await getJobOfferById(id);
			setJobOffer(data);
		};

		fetchJobOffer();
	}, [id]);
	// const [jobOfferId, setJobOfferId] = useState(null);
	const applyForJob = async (jobOfferId, userId) => {
		try {
			const response = await axios.post(
				"http://localhost:5000/api/applications",
				{
					jobOfferId,
					userId,
				}
			);
			console.log(response);

			setStatus("Application submitted");
		} catch (err) {
			console.error(err);
			setStatus("Error submitting application");
		}
	};

	if (!jobOffer) return <p className="text-center text-gray-500">Loading...</p>;

	return (
		<>
			<Header />
			<main id="main ">
				<section id="services" className="section section-bg pt-28">
					<div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
						<h1 className="text-2xl font-bold mb-2">{jobOffer.title}</h1>
						<p className="text-gray-700 mb-2">
							<strong>Company:</strong> {jobOffer.company}
						</p>
						<p className="text-gray-700 mb-2">
							<strong>Location:</strong> {jobOffer.location}
						</p>
						<p className="text-gray-600 mb-4">{jobOffer.description}</p>
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							onClick={() => applyForJob(jobOffer._id, userId)}
						>
							Apply
						</button>
						{status && (
							<p className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
								{status}
							</p>
						)}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default JobOfferDetails;
