"use client";
import React from "react";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Bell, Palette, Shield } from "lucide-react";

export default function Page() {
	return (
		<div className="w-full px-4 py-6 sm:px-6 lg:px-8">
			<div className="mx-auto flex max-w-3xl flex-col gap-6">
				<header>
					<h1 className="text-2xl font-bold tracking-tight">Settings</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						Manage your experience and account preferences.
					</p>
				</header>

				<section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-black/[0.025]">
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

				<section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-black/[0.025]">
					<div className="border-b border-border px-5 py-4">
						<h2 className="text-sm font-semibold">Account</h2>
					</div>

					<div className="divide-y divide-border">
						<div className="flex items-center gap-3 px-5 py-4">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card2 text-muted-foreground">
								<Bell size={19} />
							</div>
							<div>
								<p className="text-sm font-semibold">Notifications</p>
								<p className="text-sm text-muted-foreground">
									No notification preferences configured yet.
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 px-5 py-4">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card2 text-muted-foreground">
								<Shield size={19} />
							</div>
							<div>
								<p className="text-sm font-semibold">Privacy</p>
								<p className="text-sm text-muted-foreground">
									Account controls will appear here when available.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
