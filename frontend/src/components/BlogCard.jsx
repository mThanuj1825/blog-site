import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { dateToString } from "../utils/utils.js";

export function BlogCard({ post }) {
	return (
		<Card className={ "flex w-full justify-center my-8 hover:bg-muted" }>
			<Link className={ "w-full" } to={ `/read-blog/${ post._id }` }>
				<CardHeader>
					<CardTitle>
						<h1
							className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">{ post.title }</h1>
					</CardTitle>
					<CardDescription>
						<h6>{ post.description }</h6>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<img src={ post.image } alt={ post.title } className={ "postImage" } />
				</CardContent>
				<CardFooter>
					<blockquote className="mt-6 border-l-2 pl-6 italic">{ dateToString(post.dateCreated) }</blockquote>
				</CardFooter>
			</Link>
		</Card>
	);
}

BlogCard.propTypes = {
	post: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		dateCreated: PropTypes.string,
	}),
};