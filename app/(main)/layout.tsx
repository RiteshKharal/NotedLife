"use client";

import Image from "next/image";
import {
	Bell,
	BookOpenText,
	CircleUser,
	Compass,
	Plus,
	Search,
	Settings,
} from "lucide-react";

import { ThemeToggle } from "../components/ThemeToggle";
import { useRef, useState } from "react";
import { useSettleExit } from "../hooks/useSettleExit";
import { usePathname, useRouter } from "next/navigation";
import { GetSession } from "../actions/session";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [NotificationActive, setNotificationActive] = useState<boolean>(false);
	const pathname = usePathname();
	const notificationRef = useRef<HTMLDivElement | null>(null);
	const session = GetSession();

	useSettleExit(notificationRef, () => {
		setNotificationActive(false);
	});

	const router = useRouter();
	const navItems = [
		{ label: "Feed", href: "/", icon: Compass, active: pathname === "/" },
		{
			label: "Library",
			href: "/library",
			icon: BookOpenText,
			active: pathname.startsWith("/library"),
		},
		{
			label: "Settings",
			href: "/settings",
			icon: Settings,
			active: pathname.startsWith("/settings"),
		},
	];

	return (
		<main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
			<section className="mx-auto grid min-h-screen w-full grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">
				<aside className="sticky top-0 hidden border-r border-border bg-card/70 px-7 py-6 backdrop-blur-xl lg:block">
					<div>
						<p className="mt-4 text-lg font-black leading-none tracking-wide">
							NotedLife
						</p>
					</div>

					<nav className="mt-10 space-y-5">
						<button
							className={`flex h-12 w-full items-center justify-between rounded-lg px-3 text-sm font-bold transition ${
								pathname.endsWith("/") && pathname.length === 1
									? "bg-primary text-background shadow-lg shadow-primary/15 hover:bg-primary-hover"
									: "text-muted-foreground hover:bg-muted"
							}`}
							onClick={() => {
								router.push("/");
							}}
						>
							<span className="flex items-center gap-3">
								<Compass size={19} />
								Today
							</span>
						</button>

						<button
							className={`flex h-12 w-full items-center justify-between rounded-lg px-3 text-sm font-bold transition hover:bg-muted ${
								pathname.startsWith("/library")
									? "bg-primary text-background shadow-lg shadow-primary/15 hover:bg-primary-hover"
									: "text-muted-foreground"
							}`}
							onClick={() => {
								router.push("/library");
							}}
						>
							<span className="flex items-center gap-3">
								<BookOpenText size={19} />
								Library
							</span>
						</button>
					</nav>

					<div className="mt-8 border-t border-border pt-6">
						<p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
							Spaces
						</p>

						<div className="mt-4 space-y-3 text-sm font-semibold">
							<button
								className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-foreground hover:bg-muted ${
									pathname.startsWith("/settings") ? "" : ""
								}`}
								onClick={() => {
									router.push("/settings");
								}}
							>
								Settings
							</button>
						</div>
					</div>
				</aside>

				<div className="flex min-w-0 flex-col pb-20 lg:pb-0">
					<header className="sticky top-0 z-20 border-b border-border bg-background/88 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8 ">
						<div className="mx-auto flex max-w-6xl items-center gap-3">
							<div className="mr-1 lg:hidden">
								<p className="text-lg font-black tracking-tight">NotedLife</p>
							</div>

							<label className="hidden h-11 min-w-0 flex-1 items-center gap-3 rounded-xl border border-border bg-card px-3 text-sm shadow-sm shadow-black/[0.02] transition focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/10 sm:flex">
								<Search size={18} className="shrink-0 text-muted-foreground" />

								<input
									type="text"
									placeholder="Search posts, media, people"
									className="min-w-0 flex-1 bg-transparent font-medium outline-none placeholder:text-muted-foreground"
								/>
							</label>

							<button
								className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-background transition hover:bg-primary-hover active:scale-[0.98] sm:w-auto sm:px-4 gap-1"
								onClick={() => router.push("/post")}
								aria-label="New post"
							>
								<Plus size={18} />
								<span className="hidden text-sm font-semibold sm:inline">
									New post
								</span>
							</button>

							<div className="relative" ref={notificationRef}>
								<button
									className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm shadow-black/2 transition hover:bg-muted hover:text-foreground"
									onClick={() => setNotificationActive((current) => !current)}
									aria-label="Notifications"
								>
									<Bell size={19} />
								</button>

								{NotificationActive && (
									<div className="absolute right-0 top-full z-50 mt-3 flex min-h-64 w-[min(22rem,calc(100vw-2rem))] flex-col rounded-2xl border border-border bg-card p-4 shadow-xl shadow-black/10 animate-[PopIn_0.08s_ease-out]">
										<div className="flex items-center justify-between border-b border-border pb-3">
											<section className="text-sm font-semibold">
												Notifications
											</section>
											<Bell size={18} className="text-muted-foreground" />
										</div>

										<div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
											Nothing more to view
										</div>
									</div>
								)}
							</div>

							<ThemeToggle />

							{session?.user ? (
								<button className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm shadow-black/2 transition hover:bg-muted hover:text-foreground relative overflow-hidden pointer-events-none">
									{session.user.image ? (
										<Image
											src={session.user.image}
											alt="Person"
											sizes="28x28"
											fill
										/>
									) : (
										<CircleUser />
									)}
								</button>
							) : (
								<button
									className="hidden h-11 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:bg-muted active:scale-[0.99] md:flex"
									onClick={() => router.push("/signup")}
								>
									Sign up
								</button>
							)}
						</div>
					</header>

					{children}

					<nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-3 py-2 backdrop-blur-xl lg:hidden ">
						<div className="mx-auto grid max-w-md grid-cols-3 gap-2">
							{navItems.map((item) => {
								const Icon = item.icon;

								return (
									<button
										key={item.href}
										className={`flex h-12 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold transition ${
											item.active
												? "bg-primary/10 text-primary"
												: "text-muted-foreground hover:bg-muted hover:text-foreground"
										}`}
										onClick={() => router.push(item.href)}
									>
										<Icon size={18} />
										{item.label}
									</button>
								);
							})}
						</div>
					</nav>
				</div>
			</section>
		</main>
	);
}
