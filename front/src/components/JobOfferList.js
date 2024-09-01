// src/components/JobOfferList.js
import React, { useEffect, useState } from "react";
import { getJobOffers } from "../services/jobOfferService";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Auth/Header";

const JobOfferList = () => {
	const [jobOffers, setJobOffers] = useState([]);

	useEffect(() => {
		const fetchJobOffers = async () => {
			const data = await getJobOffers();
			setJobOffers(data);
		};

		fetchJobOffers();
	}, []);

	return (
		<>
			<Header />
			<main id="main ">
				<section id="services" className="section section-bg pt-28">
					<div className="max-w-4xl mx-auto p-4">
						<h1 className="text-3xl font-bold mb-6">Job Offers</h1>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{jobOffers.map((offer) => (
								<div
									key={offer._id}
									className="bg-white rounded-lg shadow-md p-4 flex flex-col"
								>
									<h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
									<p className="text-gray-700 mb-2">{offer.company}</p>
									<p className="text-gray-700 mb-2">{offer.location}</p>
									<p className="text-gray-600 mb-4">{offer.description}</p>
									<div className="mt-auto">
										<Link to={`/job-offer/${offer._id}`}>
											<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
												View Details
											</button>
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>{" "}
				</section>
			</main>
			<Footer />
		</>
	);
};

export default JobOfferList;
