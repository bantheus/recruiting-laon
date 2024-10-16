"use client";

import { Button } from "@/app/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { PasswordInput } from "@/app/components/ui/password-input";
import { type LoginSchema, loginSchema } from "@/app/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";

export default function LoginPage() {
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error);
			}

			window.location.href = "/filmes-series";
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col justify-center h-screen bg-[#282739] px-5">
			<div className="gap-2 flex flex-col">
				<h2 className="text-white font-semibold text-2xl">Entrar</h2>
				<p className="text-[#B5B3CB]">Bem-vindo(a) de volta!</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 mt-10"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type="email" placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl className="relative">
									<PasswordInput {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full bg-white text-gray-100 font-semibold mt-2"
					>
						Entrar
					</Button>
				</form>
			</Form>

			<Link href="">
				<Button
					type="submit"
					variant="outline"
					className="w-full bg-tr text-white font-semibold mt-2 uppercase"
				>
					Cadastrar
				</Button>
			</Link>
		</div>
	);
}
