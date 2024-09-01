import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "./Header";

const Signup = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "job_seeker",
	});

	const { name, email, password, role } = formData;
	const navigate = useNavigate();

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/api/auth/signup",
				formData
			);
			localStorage.setItem("token", response.data.token);
			navigate("/profile");
		} catch (err) {
			// console.error(err.response.data);
		}
	};

	return (
		<>
			<Header />
			<main id="main ">
				<section id="services" className="section section-bg pt-28">
					<div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
						<h1 className="text-2xl font-bold mb-4">Sign Up</h1>
						<form onSubmit={onSubmit} className="space-y-4">
							<input
								type="text"
								name="name"
								value={name}
								onChange={onChange}
								placeholder="Name"
								required
								className="w-full p-2 border rounded"
							/>
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
							<select
								name="role"
								value={role}
								onChange={onChange}
								className="w-full p-2 border rounded"
							>
								<option value="job_seeker">Job Seeker</option>
								<option value="hr">HR Representative</option>
							</select>
							<button
								type="submit"
								className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
							>
								Sign Up
							</button>
						</form>
					</div>
				</section>
			</main>{" "}
			<Footer />
		</>
	);
};

export default Signup;
