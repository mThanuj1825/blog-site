import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";

export function Layout() {
	const navigate = useNavigate();
	const user = sessionStorage.getItem("user");
	
	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	}, [user]);
	
	return (
		<>
			<Navbar />
			<main className={ "flex w-screen justify-center mt-24" }>
				<Outlet />
			</main>
		</>
	);
}