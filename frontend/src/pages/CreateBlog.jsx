import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useState } from "react";
import { createPost } from "../utils/api.js";

export function CreateBlog() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState("");
	
	async function handleSubmit(e) {
		e.preventDefault();
		
		let newPost = {
			title: title,
			description: description,
			content: content,
			image: image,
			author: null,
			dateCreated: new Date(),
		};
		
		await createPost(newPost);
		setTitle("");
		setDescription("");
		setContent("");
		setImage("");
	}
	
	async function handleFileUpload(e) {
		const file = e.target.files[0];
		const base64 = await convertToBase64(file);
		setImage(base64);
	}
	
	async function convertToBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				resolve(reader.result);
			};
			
			reader.onerror = (err) => {
				reject(err);
			};
		});
	}
	
	return (
		<form onSubmit={ handleSubmit } className={ "w-1/3" }>
			<Label htmlFor={ "title" }> Title: </Label>
			<Input name={ "title" } id={ "title" } value={ title } onChange={ (e) => {
				setTitle(e.target.value);
			} } maxLength={ 100 } required={ true } />
			<Label htmlFor={ "description" }>Description: </Label>
			<Input name={ "description" } id={ "description" } value={ description } onChange={ (e) => {
				setDescription(e.target.value);
			} } maxLength={ 200 } required={ true } />
			<Label htmlFor={ "content" }>Content: </Label>
			<Textarea name={ "content" } id={ "content" } value={ content } onChange={ (e) => {
				setContent(e.target.value);
			} } maxLength={ 5000 } required={ true } />
			<Label htmlFor={ "image" }>Image: </Label>
			<Input type={ "file" } name={ "image" } id={ "image" } accept={ ".jpg, .png, .jpeg" } required={ false }
			       onChange={ handleFileUpload } />
			<Button type={ "submit" } className={ "mt-4" }>Create Post</Button>
		</form>
	);
}