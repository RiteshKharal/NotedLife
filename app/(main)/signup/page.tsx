"use client";

import React, { useEffect } from "react";
import * as fonts from "@/app/fonts";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthClient } from "@/lib/auth-client";
import { useAtom } from "jotai";
import { GetSession } from "@/app/actions/session";

export default function Page() {
	const router = useRouter();
	const session = GetSession();

	async function HandleSignUp(formdata: {
		name: string;
		email: string;
		password: string;
	}) {
		const { data, error } = await AuthClient.signUp.email({
			name: formdata.name,
			email: formdata.email,
			password: formdata.password,
			callbackURL: "/dashboard",
		});

		console.log(data, error);
	}

	useEffect(() => {
		if (session !== null) {
			router.push("/")
		}
	}, [router, session]);

	return (
		<div
			className={`
				flex min-h-screen items-center justify-center
				bg-background px-4 py-10
				${fonts.geistSans.className}
			`}
		>
			<div
				className="
					w-full max-w-150 overflow-hidden
					rounded-[2rem]
					border border-border
					bg-card
					shadow-xl
				"
			>
				<div className="border-b border-border px-8 pt-8 pb-6">
					<h1
						className={`
							text-3xl font-bold tracking-tight
							${fonts.geistSans.className}
						`}
					>
						Create account
					</h1>
				</div>

				<form
					action={(formdata) => {
						HandleSignUp({
							name: formdata.get("name") as string,
							email: formdata.get("email") as string,
							password: formdata.get("password") as string,
						});
					}}
					className="px-8 py-7"
				>
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<label
								className={`
									text-sm font-medium text-foreground/70
									${fonts.comfortaa.className}
								`}
							>
								Name
							</label>

							<div
								className="
									flex h-13 items-center gap-3
									rounded-xl border border-border
									bg-background px-4
									transition focus-within:border-primary
								"
							>
								<User size={18} className="text-foreground/40" />

								<input
									type="text"
									name="name"
									placeholder="Enter your name"
									className="
										w-full bg-transparent
										text-[15px]
										outline-none rounded-lg px-1
										placeholder:text-foreground/35
									"
								/>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<label
								className={`
									text-sm font-medium text-foreground/70
									${fonts.comfortaa.className}
								`}
							>
								Email
							</label>

							<div
								className="
									flex h-13 items-center gap-3
									rounded-xl border border-border
									bg-background px-4
									transition focus-within:border-primary
								"
							>
								<Mail size={18} className="text-foreground/40" />

								<input
									type="email"
									name="email"
									placeholder="Enter your email"
									className="
										w-full bg-transparent
										text-[15px]
										outline-none rounded-lg px-1
										placeholder:text-foreground/35
									"
								/>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<label
								className={`
									text-sm font-medium text-foreground/70
									${fonts.comfortaa.className}
								`}
							>
								Password
							</label>

							<div
								className="
									flex h-13 items-center gap-3
									rounded-xl border border-border
									bg-background px-4 
									transition focus-within:border-primary
								"
							>
								<Lock size={18} className="text-foreground/40" />

								<input
									type="password"
									name="password"
									placeholder="Create a password"
									className="
										w-full bg-transparent
										text-[15px]
										outline-none
                                        rounded-lg  px-1
										placeholder:text-foreground/35
									"
								/>
							</div>
						</div>
					</div>

					<button
						type="submit"
						className="
							mt-8 flex h-13 w-full items-center
							justify-center gap-2
							rounded-xl bg-primary
							text-sm font-semibold text-background
							transition-all duration-200
							hover:bg-primary-hover
							active:scale-[0.99] group
						"
					>
						Create account
						<ArrowRight
							size={17}
							className="transition-transform group-hover:translate-x-2"
						/>
					</button>

					<div className="mt-6 text-center text-sm text-foreground/50">
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
