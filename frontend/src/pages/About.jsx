import { Link } from "react-router-dom";

export function About() {
	return (
		<div className={ "w-1/3" }>
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">
				About Us
			</h1>
			<p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">Welcome to Blog Busters! Our
			                                                                                  blog is dedicated to sharing
			                                                                                  insightful and engaging content
			                                                                                  on any topic you can
			                                                                                  think of.
			</p>
			<p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
				We aim to inspire, inform, and entertain our readers
				with fresh perspectives and practical tips.
			</p>
			<p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
				Join us on this
				journey as we explore new ideas and foster a
				community of curious minds.
			</p>
			<p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
				Create a new blog by visiting
				out <Link to={ "/create-blog" }>Create
				                                Blog</Link> page.
				Thank you for stopping by!</p>
		</div>
	);
}