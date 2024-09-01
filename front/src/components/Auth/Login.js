import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Chatbot from "../Chatbot/Chatbot";
import Footer from "../Footer";
import Header from "./Header";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [recaptchaToken, setRecaptchaToken] = useState(null);

	const { email, password } = formData;
	const navigate = useNavigate();

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onRecaptchaChange = (token) => {
		setRecaptchaToken(token);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!recaptchaToken) {
			alert("Please complete the reCAPTCHA.");
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:5000/api/auth/login",
				formData
			);

			console.log(response.data);

			localStorage.setItem("token", response.data.token);
			navigate("/profile");
		} catch (err) {
			console.error(err.response.data);
		}
	};

	return (
		<>
			<Header />
			<main id="main ">
				<section id="services" className="section section-bg pt-28">
					<div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg py-28">
						<Chatbot />
						<h1 className="text-2xl font-bold mb-4">Login</h1>
						<form onSubmit={onSubmit} className="space-y-4">
							<input
								type="email"
								name="email"
								value={email}
								onChange={onChange}
								placeholder="Email"
								required
								className="w-full p-2 border rounded"
							/>
							<input
								type="password"
								name="password"
								value={password}
								onChange={onChange}
								placeholder="Password"
								required
								className="w-full p-2 border rounded"
							/>
							<ReCAPTCHA
								sitekey="6LcF_4opAAAAABC5dxW3EiH2FobRpLOUkYD2hvwS"
								onChange={onRecaptchaChange}
							/>
							<button
								type="submit"
								className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
							>
								Login
							</button>
						</form>
					</div>{" "}
					{/* ======= Footer ======= */}
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Login;
