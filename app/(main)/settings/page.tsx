"use client";

import React, { useState } from "react";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import ProfilePicture from "./components/ProfilePicture";
import * as font from "@/app/fonts";
import { Palette, Star } from "lucide-react";
import { AuthClient } from "@/lib/auth-client";
import { useNotification } from "@/app/hooks/useGlobalNotification";

export default function Page() {
	const { notify } = useNotification();
	const [SigningOut, setSigningOut] = useState(false);

	return (
		<div className="w-full px-4 py-6 sm:px-6 lg:px-8">
			<div className="mx-auto flex max-w-3xl flex-col gap-6">
				<header>
					<h1 className="text-2xl font-bold tracking-tight">Settings</h1>

					<p className="mt-2 text-sm text-muted-foreground">
						Manage your experience and account preferences.
					</p>
				</header>

				<section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-black/2.5">
					<div className="border-b border-border px-5 py-4">
						<h2 className="text-sm font-semibold">Appearance</h2>

						<p className="mt-1 text-sm text-muted-foreground">
							Choose a comfortable theme for your feed.
						</p>
					</div>

					<div className="flex items-center justify-between gap-4 px-5 py-4">
						<div className="flex min-w-0 items-center gap-3">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
								<Palette size={19} />
							</div>

							<div>
								<p className="text-sm font-semibold">Theme</p>

								<p className="text-sm text-muted-foreground">
									Switch between light and dark mode.
								</p>
							</div>
						</div>

						<ThemeToggle />
					</div>
				</section>

				<section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-black/2.5">
					<div className="border-b border-border px-5 py-4">
						<h2 className="text-sm font-semibold">Account</h2>
					</div>

					<section className="flex flex-col mb-5 gap-5">
						<div className="flex items-center justify-between gap-3 px-5 py-6">
							<div className="flex gap-3">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card2 text-muted-foreground">
									<Star size={19} />
								</div>

								<div>
									<p className="text-sm font-semibold">Personalization</p>

									<p className="text-sm text-muted-foreground">
										Customize your public profile appearance.
									</p>
								</div>
							</div>
						</div>

						<div className="border-l-2  border-foreground rounded-b-2xl mx-10 flex flex-col">
							<div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between  pl-12  ">
								<div>
									<h3 className="text-sm font-semibold">Profile Picture</h3>

									<p className="mt-1 max-w-xs text-sm text-muted-foreground">
										Upload a image suiting your profile.
									</p>
								</div>

								<ProfilePicture />
							</div>
						</div>
					</section>
				</section>

				<section>
					<button
						className={` p-3 px-4 rounded-xl shadow-[0_0_1px] shadow-danger float-right ${SigningOut ? "bg-danger/45 cursor-progress!" : "bg-danger cursor-pointer"}`}
						onClick={async () => {
							if (SigningOut) return;

							await AuthClient.signOut({
								fetchOptions: {
									onSuccess: () => {
										window.location.href = "/";
									},
									onError: () => {
										notify({ message: "Couldn't log out!" });
									},
									onRequest: () => {
										setSigningOut(true);
									},
								},
							});
						}}
					>
						<span
							className={`font-bold text-background ${font.cabin.className}`}
						>
							Sign Out
						</span>
					</button>
				</section>
			</div>
		</div>
	);
}
