import "./App.css";
import axios from "axios";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";
import { CreateBlog } from "./pages/CreateBlog.jsx";
import { Home } from "./pages/Home.jsx";
import { Landing } from "./pages/Landing.jsx";
import { Profile } from "./pages/Profile.jsx";
import { ReadBlog } from "./pages/ReadBlog.jsx";

export default function App() {
	axios.interceptors.request.use(
		(config) => {
			const token = sessionStorage.getItem("user");
			if (token) {
				config.headers.authorization = `Bearer ${ token }`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);
	
	return (
		<Router>
			<Routes>
				<Route path={ "/" } element={ <Landing /> } />
				<Route element={ <Layout /> }>
					<Route path={ "/about" } element={ <About /> } />
					<Route path={ "/contact" } element={ <Contact /> } />
					<Route path={ "/create-blog" } element={ <CreateBlog /> } />
					<Route path={ "/home" } element={ <Home /> } />
					<Route path={ "/profile" } element={ <Profile /> } />
					<Route path={ "/read-blog/:id" } element={ <ReadBlog /> } />
				</Route>
			</Routes>
		</Router>
	);
}