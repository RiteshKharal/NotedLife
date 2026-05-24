"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Loader, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthClient } from "@/lib/auth-client";
import { GetSession } from "@/app/actions/session";
import * as fonts from "@/app/fonts";
import { ValidateFormData } from "@/app/logics/Validator";
export default function Page() {
	const router = useRouter();
	const session = GetSession();
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<null | string>(null);

	async function HandleSignUp(formdata: FormData) {
		setPending(true);
		setError(null);

		const ValidatedData = ValidateFormData(formdata, (msg) => {
			setError(msg);
		});

		if (!ValidatedData) {
			setPending(false);
			return;
		}

		const name = ValidatedData.get("name") as string;
		const email = ValidatedData.get("email") as string;
		const password = ValidatedData.get("password") as string;

		const { data, error } = await AuthClient.signUp.email({
			name,
			email,
			password,
			callbackURL: "/",
		});

		if (error) {
			setError(error.message || "Something went wrong");
		}

		setPending(false);
	}

	useEffect(() => {
		if (session?.user) {
			router.push("/");
		}
	}, [router, session]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
			<div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/6 transition-all transform- duration-300">
				<div className="border-b border-border px-6 py-6 sm:px-8">
					<p className="text-sm font-semibold text-primary">NotedLife</p>
					<h1 className="mt-2 text-2xl font-bold tracking-tight">
						Create account
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						Start sharing and saving your favorite moments.
					</p>
				</div>

				<form
					action={(formdata) => {
						HandleSignUp(formdata);
					}}
					className="px-6 py-6 sm:px-8"
					noValidate
				>
					<div className="flex flex-col gap-5 mb-8">
						<div className="flex flex-col gap-2">
							<label className="text-sm font-semibold text-foreground">
								Name
							</label>

							<div className="flex h-12 items-center gap-3 rounded-xl border border-border bg-background px-4 transition focus-within:border-primary/70 focus-within:ring-4 focus-within:ring-primary/10">
								<User size={18} className="text-muted-foreground" />

								<input
									type="text"
									name="name"
									placeholder="Enter your name"
									className="w-full rounded-lg bg-transparent px-1 text-[15px] outline-none placeholder:text-muted-foreground"
								/>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<label className="text-sm font-semibold text-foreground">
								Email
							</label>

							<div className="flex h-12 items-center gap-3 rounded-xl border border-border bg-background px-4 transition focus-within:border-primary/70 focus-within:ring-4 focus-within:ring-primary/10">
								<Mail size={18} className="text-muted-foreground" />

								<input
									type="email"
									name="email"
									placeholder="Enter your email"
									className="w-full rounded-lg bg-transparent px-1 text-[15px] outline-none placeholder:text-muted-foreground"
								/>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<label className="text-sm font-semibold text-foreground">
								Password
							</label>

							<div className="flex h-12 items-center gap-3 rounded-xl border border-border bg-background px-4 transition focus-within:border-primary/70 focus-within:ring-4 focus-within:ring-primary/10">
								<Lock size={18} className="text-muted-foreground" />

								<input
									type="password"
									name="password"
									placeholder="Create a password"
									className="w-full rounded-lg bg-transparent px-1 text-[15px] outline-none placeholder:text-muted-foreground"
								/>
							</div>
						</div>
					</div>

					{/* {error && (
						<div
							className={`text-danger text-[0.94rem] font-bold ${fonts.cabin.className} animate-[FadeIn_300ms_ease-out]`}
						>
							{error}
						</div>
					)} */}

					<div
						className={`text-danger text-[0.94rem] font-bold ${fonts.cabin.className} ${error ? "animate-[FadeIn_300ms_ease-out]" : ""} min-h-6`}
					>
						{error}
					</div>
					<button
						type="submit"
						className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white transition hover:bg-primary-hover active:scale-[0.99]"
					>
						{pending ? (
							<>
								<Loader className="animate-[Rotate360_5s_ease-out_infinite]" />
							</>
						) : (
							<>
								Create account
								<ArrowRight
									size={17}
									className="transition-transform group-hover:translate-x-2"
								/>
							</>
						)}
					</button>

					<div className="mt-6 text-center text-sm text-muted-foreground">
						Already have an account?{" "}
						<button
							type="button"
							className="font-medium text-primary hover:underline"
							onClick={() => {
								router.push("/signin");
							}}
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
