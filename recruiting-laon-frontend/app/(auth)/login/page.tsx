"use client";

import Header from "@/app/components/header";
import Spinner from "@/app/components/spinner";
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
import { toast } from "@/app/hooks/use-toast";
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

			toast({
				title: "Login efetuado com sucesso",
				variant: "success",
			});

			window.location.href = "/";
		} catch (error) {
			console.error(error);
			toast({
				title: "Erro ao realizar login. Verifique suas credenciais.",
				variant: "destructive",
			});
		}
	};

	return (
		<>
			<Header />
			<main className="md:bg-gray-100 md:py-8 h-svh flex items-center w-full">
				<div className="flex md:rounded-lg md:mx-auto flex-col w-full md:max-w-[588px] h-screen md:h-auto justify-center  bg-background px-5 pt-16 py-10 md:px-14 md:pt-10">
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
											<Input
												type="email"
												placeholder="Email"
												{...field}
												disabled={form.formState.isSubmitting}
											/>
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
											<PasswordInput
												{...field}
												disabled={form.formState.isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full bg-white text-gray-100 font-semibold mt-2"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? <Spinner /> : "Entrar"}
							</Button>
						</form>
					</Form>

					<Link href="/signup">
						<Button
							type="submit"
							variant="outline"
							className="w-full bg-tr text-white font-semibold mt-2 uppercase"
						>
							Cadastrar
						</Button>
					</Link>
				</div>
			</main>
		</>
	);
}
