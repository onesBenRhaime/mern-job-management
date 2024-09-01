import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderAdmin from "./HeaderAdmin";
import axios from "axios";

const ListUsers = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/users/all");
				console.log(response.data);

				setUsers(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchUser();
	}, []);
	// Function to assign role to a user
	const assignRole = async (userId, role) => {
		try {
			const response = await axios.put(
				`http://localhost:5000/api/users/role/${userId}`,
				{
					role,
				}
			);
			console.log(response.data);
			setUsers(
				users.map((user) => (user._id === userId ? response.data : user))
			);
		} catch (err) {
			console.error(err);
		}
	};

	// Function to delete a user
	const deleteUser = async (userId) => {
		try {
			await axios.delete(`http://localhost:5000/api/users/${userId}`);
			setUsers(users.filter((user) => user._id !== userId));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<HeaderAdmin />
			<main id="main ">
				<section id="services" className="section section-bg pt-28">
					<div className="mx-5  mt-10 p-4 border rounded shadow-lg">
						<div class="table-responsive">
							<table class="table table-striped table-hover table-borderless table-primary align-middle">
								<thead class="table-light">
									<caption>List users</caption>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Email</th>
										<th scope="col">Role</th>
										<th scope="col">Actions</th>
									</tr>
								</thead>
								<tbody class="table-group-divider">
									{users.map((user) => (
										<tr key={user._id}>
											<td>{user.name}</td>
											<td>{user.email}</td>
											<td>{user.role}</td>
											<td>
												<select
													className="me-2"
													onChange={(e) => assignRole(user._id, e.target.value)}
													value={user.role}
												>
													<option value="job_seeker">job_seeker</option>
													<option value="hr">HR Representative</option>
													<option value="admin">Admin</option>
												</select>
												<button
													className="btn btn-danger"
													onClick={() => deleteUser(user._id)}
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
								<tfoot></tfoot>
							</table>
						</div>
					</div>
				</section>
			</main>{" "}
			<Footer />
		</>
	);
};

export default ListUsers;
