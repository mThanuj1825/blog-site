import { Button } from "@/components/ui/button.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readPost } from "../utils/api.js";
import { dateToString } from "../utils/utils.js";

export function ReadBlog() {
	const { id } = useParams();
	const [post, setPost] = useState({});
	const navigate = useNavigate();
	
	useEffect(() => {
		async function loadBlog() {
			const response = await readPost(id);
			setPost(response);
		}
		
		loadBlog();
	}, []);
	
	return (
		<div className={ "flex flex-col w-1/2 my-4" }>
			<h1
				className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-primary">{ post.title }</h1>
			<h2
				className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">{ post.description }</h2>
			<div className={ "flex w-full justify-center" }>
				<img src={ post.image } alt={ post.title } className={ "max-h-96 my-4" } />
			</div>
			<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{ dateToString(post.dateCreated) }</h3>
			<p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">{ post.content }</p>
			<Button className={ "w-1/3 m-auto mt-4" } onClick={ () => {
				navigate(-1);
			} }>
				<i className="fa-solid fa-left-long" />
				&nbsp;&nbsp;Back
			</Button>
		</div>
	);
}