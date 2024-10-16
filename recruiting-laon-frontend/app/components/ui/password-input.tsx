"use client";

import { cn } from "@/app/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import { Input, type InputProps } from "./input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false);
		const disabled =
			props.value === "" || props.value === undefined || props.disabled;

		return (
			<div className="relative">
				<Input
					type={showPassword ? "text" : "password"}
					placeholder="Senha"
					className={cn("hide-password-toggle", className)}
					ref={ref}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute right-0 top-0 h-full p-6 hover:bg-transparent"
					onClick={() => setShowPassword((prev) => !prev)}
					disabled={disabled}
				>
					{showPassword && !disabled ? (
						<EyeIcon className="size-5 text-gray-500" aria-hidden="true" />
					) : (
						<EyeOffIcon className="size-5 text-gray-500" aria-hidden="true" />
					)}
					<span className="sr-only">
						{showPassword ? "Hide password" : "Show password"}
					</span>
				</Button>
			</div>
		);
	},
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
