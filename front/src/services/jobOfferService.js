// src/services/jobOfferService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/jobOffers";

export const getJobOffers = async () => {
	const response = await axios.get(API_URL);

	return response.data;
};

export const getJobOfferById = async (id) => {
	const response = await axios.get(`${API_URL}/${id}`);
	return response.data;
};
