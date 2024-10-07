import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import * as React from "react";

const labelVariants = cva(
	"text-lg mb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 left-0 flex mt-4",
);

const Label = React.forwardRef(({ className, ...props }, ref) => (
	<LabelPrimitive.Root ref={ ref } className={ cn(labelVariants(), className) } { ...props } />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
