import * as jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard.jsx";
import { readPosts } from "../utils/api.js";
import { dateToString } from "../utils/utils.js";

export function Profile() {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState({});
	
	useEffect(() => {
		async function loadUserData() {
			const token = sessionStorage.getItem("user");
			const userData = jwt_decode.jwtDecode(token);
			const allPosts = await readPosts();
			const filteredPosts = allPosts.filter((post) => {
				return post.author === userData._id;
			});
			setPosts(filteredPosts);
			setUser(userData);
		}
		
		loadUserData();
	}, []);
	
	return (
		<div className={ "text-left w-1/3" }>
			<label
				className={ "flex left-0 text-3xl font-semibold tracking-tight first:mt-0" }>Name: </label>
			<h2 className={ "flex left-0 text-lg mb-2" }>{ user.name }</h2>
			<label
				className={ "flex left-0 text-3xl font-semibold tracking-tight first:mt-0" }>Email: </label>
			<h2 className={ "flex left-0 text-lg mb-2" }>{ user.email }</h2>
			<label className={ "flex left-0 text-3xl font-semibold tracking-tight first:mt-0" }>Join
			                                                                                    Date: </label>
			<h2 className={ "flex left-0 text-lg mb-2" }>{ dateToString(user.joinDate) }</h2>
			<label
				className={ "flex left-0 text-3xl font-semibold tracking-tight first:mt-0" }>Posts: </label>
			{
				posts.length !== 0 ?
					posts.map((post) => {
						return (
							<BlogCard key={ post.id } post={ post } />
						);
					}) :
					<h3>No posts yet</h3>
			}
		</div>
	);
}