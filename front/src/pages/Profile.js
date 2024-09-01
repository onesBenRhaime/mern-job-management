// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Auth/Header";

const Profile = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get("http://localhost:5000/api/users/me", {
					headers: {
						"x-auth-token": token,
					},
				});
				console.log(response.data);

				setUser(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchUser();
	}, []);

	return (
		<>
			<Header />
			<main id="main ">
				<section id="services" className="section section-bg pt-28">
					<div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
						<h1 className="text-2xl font-bold mb-4">User Profile</h1>
						{user ? (
							<div>
								<p className="text-lg">
									<strong>Name:</strong> {user.name}
								</p>
								<p className="text-lg">
									<strong>Email:</strong> {user.email}
								</p>
								{/* Add more profile details here */}
							</div>
						) : (
							<p>Loading...</p>
						)}
					</div>
				</section>
			</main>{" "}
			<Footer />
		</>
	);
};

export default Profile;
