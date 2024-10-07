import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";

export function Contact() {
	
	function handleSubmit() {
		
	}
	
	return (
		<div className={ "w-1/3" }>
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">Contact Us</h1>
			<p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">Have questions or feedback? Feel
			                                                                                  free to reach out to us!</p>
			<p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">You can contact us via email
			                                                                                  at <a
					href="mailto:contact@example.com">contact@example.com</a>
			                                                                                  .</p>
			<p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left mb-8">Alternatively you can fill
			                                                                                       out
			                                                                                       the form below.</p>
			<form onSubmit={ handleSubmit }>
				<Label htmlFor="name">Name: </Label>
				<Input type={ "text" } name={ "name" } id={ "name" } />
				<Label htmlFor="email">Email: </Label>
				<Input type={ "email" } name={ "email" } id={ "email" } />
				<Label htmlFor="message">Message: </Label>
				<Textarea name={ "message" } id={ "message" } />
				<Button type="submit" className={ "mt-4" }>Send</Button>
			</form>
		</div>
	);
}