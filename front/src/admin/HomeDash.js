import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import Footer from "../components/Footer";

const HomeDash = () => {
	return (
		<>
			<HeaderAdmin />

            <main id="main ">
                <section id="services" className="section section-bg pt-28">
                    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
                        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                        <p className="text-lg">Welcome to the admin dashboard.</p>
                    </div>
                </section>
            </main>{" "}
			<Footer />
		</>
	);
};

export default HomeDash;
