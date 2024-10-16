import * as React from "react";

import { cn } from "@/app/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-[72px] bg-transparent w-full rounded-sm border border-gray-300 p-6 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary  disabled:cursor-not-allowed disabled:bg-gray-300/20 placeholder:text-gray-500 placeholder:text-base text-white",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
