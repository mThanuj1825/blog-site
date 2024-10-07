import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard.jsx";
import { readPosts } from "../utils/api.js";

export function Home() {
	const [posts, setPosts] = useState([]);
	
	useEffect(() => {
		const authToken = sessionStorage.getItem("user");
		if (authToken) {
			async function loadAllPosts() {
				const data = await readPosts();
				data.sort((d1, d2) => new Date(d2.dateCreated).getTime() - new Date(d1.dateCreated).getTime());
				setPosts(data);
			}
			
			loadAllPosts();
		}
	}, []);
	
	return (
		<div className={ "flex flex-col items-center w-full" }>
			<div className={ "w-1/2 mt-4" }>
				{
					posts.map((post) => {
						return (
							<BlogCard key={ post._id } post={ post } />
						);
					})
				}
			</div>
		</div>
	);
}