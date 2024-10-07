import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../utils/api.js";

export function Login() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	
	async function handleSubmit(e) {
		e.preventDefault();
		let response = await verifyUser(user);
		
		if (response) {
			sessionStorage.setItem("user", response);
			navigate("/home");
		} else {
			alert("Login failed.");
		}
	}
	
	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}
	
	return (
		<form onSubmit={ handleSubmit } className={ "flex flex-col" }>
			<Input placeholder={ "Email" } type={ "email" } value={ user.email } name={ "email" } id={ "email" }
			       onChange={ handleChange }
			       required={ true }
			       maxLength={ 50 } className={ "mb-2" } />
			<Input placeholder={ "Password" } type={ "password" } value={ user.password } name={ "password" }
			       id={ "password" } onChange={ handleChange }
			       required={ true } maxLength={ 20 } className={ "mb-2" } />
			<Button type="submit" className={ "mb-2" }>Login</Button>
		</form>
	);
}