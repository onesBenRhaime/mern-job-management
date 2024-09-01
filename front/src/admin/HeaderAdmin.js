import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const HeaderAdmin = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	let userId;

	// Check if the token exists before decoding
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
	const logout = () => {
		localStorage.removeItem("token");
		
		navigate("/");
	};
	return (
		<>
			<header id="header" className="fixed-top  bg-black mb-36">
				<div className="container d-flex align-items-center">
					<h1 className="logo me-auto">
						<a href="index.html">Admin Management</a>
					</h1>
					<nav id="navbar" className="navbar">
						<ul>
							<li>
								<Link
									to="/admin"
									className="nav-link scrollto active"
									href="#hero"
								>
									Dash
								</Link>
							</li>
							<li>
								<Link className="nav-link scrollto" to="/users">
									User Management
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

export default HeaderAdmin;
