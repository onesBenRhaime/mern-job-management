// src/components/ApplyForJob.js
import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Auth/Header";

const ApplyForJob = ({ jobOfferId, userId }) => {
	const [status, setStatus] = useState("");

	const applyForJob = async () => {
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

	return (
		<>
			<Header />
			<main id="main ">
				<section id="services" className="section section-bg pt-28">
					<div className="p-4 border rounded shadow-lg">
						<button
							onClick={applyForJob}
							className="bg-blue-500 text-white p-2 rounded"
						>
							Apply for Job
						</button>
						{status && <p className="mt-2">{status}</p>}
					</div>
				</section>{" "}
			</main>
			<Footer />
		</>
	);
};

export default ApplyForJob;
