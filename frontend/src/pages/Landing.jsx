import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateUser } from "../components/CreateUser.jsx";
import { Login } from "../components/Login.jsx";

export function Landing() {
	const [showLogin, setShowLogin] = useState(true);
	
	return (
		<div className={ "flex justify-center items-center w-screen h-screen" }>
			{
				showLogin ?
					<div className={ "flex flex-col w-96" }>
						<Login />
						<Button onClick={ () => setShowLogin(false) }>Create new Account</Button>
					</div>
					:
					<div className={ "flex flex-col w-96" }>
						<CreateUser />
						<Button onClick={ () => setShowLogin(true) }>Login existing account</Button>
					</div>
			}
		</div>
	);
}