import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useState } from "react";
import { createUser } from "../utils/api.js";

export function CreateUser() {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});
	
	async function handleSubmit(e) {
		e.preventDefault();
		let response = await createUser(user);
		
		if (!response.data.success) {
			console.error("User not created.");
		}
	}
	
	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}
	
	return (
		<form onSubmit={ handleSubmit } className={ "flex flex-col" }>
			<Input placeholder={ "Name" } type={ "text" } value={ user.name } name={ "name" } id={ "name" }
			       onChange={ handleChange }
			       required={ true }
			       maxLength={ 20 } className={ "mb-2" } />
			<Input placeholder={ "Email" } type={ "email" } value={ user.email } name={ "email" } id={ "email" }
			       onChange={ handleChange }
			       required={ true }
			       maxLength={ 50 } className={ "mb-2" } />
			<Input placeholder={ "Password" } type={ "password" } value={ user.password } name={ "password" }
			       id={ "password" } onChange={ handleChange }
			       required={ true } maxLength={ 20 } className={ "mb-2" } />
			<Button type="submit" className={ "mb-2" }>Create Account</Button>
		</form>
	);
}