// src/services/authService.js
import axios from "axios";

export const signup = async (userData) => {
	const response = await axios.post("/api/auth/signup", userData);
	return response.data;
};

export const login = async (userData) => {
	const response = await axios.post("/api/auth/login", userData);
	return response.data;
};

export const getProfile = async () => {
	const token = localStorage.getItem("token");
	const response = await axios.get("/api/users/me", {
		headers: {
			"x-auth-token": token,
		},
	});
	return response.data;
};
