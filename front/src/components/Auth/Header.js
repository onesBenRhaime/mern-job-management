import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
const Header = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	let userId;
	// Check if the token exists and is a non-empty string
	if (token && typeof token === "string") {
		try {
			const decodedToken = jwtDecode(token); // Decode the token
			userId = decodedToken?.user?.id;
			console.log(userId);
		} catch (error) {
			console.error("Invalid token:", error.message);
			// Handle the error appropriately, e.g., redirect to login
		}
	} else {
		console.warn("No valid token found");
		// Optionally, handle the case where there's no token or it's invalid
	}
	const logout = () => {
		localStorage.removeItem("token");
	
		navigate("/");
	};
	return (
		<>
			<header id="header" className="fixed-top  bg-black mb-36">
				<div className="container d-flex align-items-center">
					<h1 className="logo me-auto">
						<a href="index.html">Arsha</a>
					</h1>
					{/* Uncomment below if you prefer to use an image logo */}
					{/* <a href="index.html" class="logo me-auto"><img src="../assets/img/logo.png" alt=""="" class="img-fluid"></a>*/}
					<nav id="navbar" className="navbar">
						<ul>
							<li>
								<Link to="/" className="nav-link scrollto active" href="#hero">
									Home
								</Link>
							</li>
							<li>
								<a className="nav-link scrollto" href="#about">
									About
								</a>
							</li>
							<li>
								<Link className="nav-link scrollto" to="/job-offers">
									Offers
								</Link>
							</li>
							<li>
								<Link className="nav-link scrollto" to={`/${userId}`}>
									My Applications
								</Link>
							</li>
							{!token ? (
								<>
									<li>
										<Link to="/login" className="getstarted scrollto">
											Login
										</Link>
									</li>
									<li>
										<Link to="/signup" className="getstarted scrollto">
											SignUp
										</Link>
									</li>
								</>
							) : (
								<li>
									<button onClick={logout} className="getstarted scrollto">
										Logout
									</button>
								</li>
							)}
						</ul>
						<i className="bi bi-list mobile-nav-toggle" />
					</nav>
					{/* .navbar */}
				</div>
			</header>
		</>
	);
};

export default Header;
