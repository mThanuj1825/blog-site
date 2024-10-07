import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { pageData } from "../utils/pageData.js";

export function Navbar() {
	const navigate = useNavigate();
	
	function handleLogout() {
		sessionStorage.removeItem("user");
		navigate("/");
	}
	
	return (
		<NavigationMenu className={ "bg-primary fixed w-screen top-0 left-0 h-20 p-2" }>
			<NavigationMenuList>
				{
					pageData.map((data, index) => {
						return (
							<NavigationMenuItem key={ index }>
								<NavigationMenuLink
									className={ navigationMenuTriggerStyle() }
									href={ data.path }>
									{ data.name }
								</NavigationMenuLink>
							</NavigationMenuItem>
						);
					})
				}
			</NavigationMenuList>
			<NavigationMenuLink
				className={ "ml-1 bg-red-500 cursor-pointer text-white hover:text-red-500 hover:bg-white " + navigationMenuTriggerStyle() }
				onClick={ handleLogout }>Logout</NavigationMenuLink>
		</NavigationMenu>
	);
}