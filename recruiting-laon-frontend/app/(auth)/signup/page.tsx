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
import { type SignupSchema, signupSchema } from "@/app/schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";

export default function SignupPage() {
	const form = useForm<SignupSchema>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<SignupSchema> = async (data) => {
		try {
			const res = await fetch("/api/signup", {
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
				title: "Cadastro efetuado com sucesso",
				variant: "success",
			});

			window.location.href = "/login";
		} catch (error) {
			console.error(error);
			toast({
				title: "Erro ao realizar cadastro. Tente novamente.",
				variant: "destructive",
			});
		}
	};

	return (
		<>
			<Header />
			<main className="flex flex-col justify-center bg-background px-5 pt-16 py-10">
				<div className="gap-2 flex flex-col">
					<h2 className="text-white font-semibold text-2xl">Cadastre-se</h2>
					<p className="text-[#B5B3CB]">
						Acompanhe os melhores filmes e séries.
					</p>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 mt-10"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="text"
											placeholder="Nome completo"
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
						<p className="text-xs text-gray-500">
							Ao clicar em <strong>cadastrar</strong>, você está aceitando os
							Termos e Condições e a Política de Privacidade da Laon.
						</p>
						<Button
							type="submit"
							className="w-full bg-white text-gray-100 font-semibold mt-2"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? <Spinner /> : "Cadastrar"}
						</Button>
					</form>
				</Form>

				<Link href="/login">
					<Button
						type="submit"
						variant="outline"
						className="w-full bg-tr text-white font-semibold mt-2 uppercase"
					>
						Entrar
					</Button>
				</Link>
			</main>
		</>
	);
}
