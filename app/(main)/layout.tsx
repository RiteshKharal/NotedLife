"use client";

import {
	Bell,
	BookOpenText,
	ChevronRight,
	Compass,
	FolderKanban,
	GalleryHorizontalEnd,
	Plus,
	Search,
	Sparkles,
} from "lucide-react";

import { ThemeToggle } from "../components/ThemeToggle";
import { useRef, useState } from "react";
import { useSettleExit } from "../hooks/useSettleExit";
import * as fonts from "../fonts";
import { useRouter } from "next/navigation";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [NotificationActive, setNotificationActive] = useState<boolean>(false);

	const notificationRef = useRef<HTMLDivElement | null>(null);

	useSettleExit(notificationRef, () => {
		setNotificationActive(false);
	});

	const router = useRouter();

	return (
		<main className="min-h-screen overflow-hidden w-full bg-background text-foreground">
			<section className="mx-auto grid min-h-screen w-full max-w-full grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] bg-[radial-gradient(circle_at_0px_0px,hsl(var(--primary)_/0.1),transparent_60%)] -z-1">
				<aside className="hidden border-border border-r bg-card/70 py-6 backdrop-blur-xl lg:block sticky top-0 px-7">
					<div>
						<p className="text-lg font-black leading-none tracking-widest mt-4">
							NotedLife
						</p>
					</div>

					<nav className="mt-10 space-y-5">
						<button
							className="flex h-12 w-full items-center justify-between rounded-lg  hover:bg-muted px-3 text-sm font-bold text-muted-foreground transition"
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
							className="flex h-12 w-full items-center justify-between rounded-lg px-3 text-sm font-bold text-muted-foreground transition hover:bg-muted"
							onClick={() => {
								router.push("/library");
							}}
						>
							<span className="flex items-center gap-3">
								<BookOpenText size={19} />
								Library
							</span>
						</button>

						{/* <button className="flex h-12 w-full items-center justify-between rounded-lg px-3 text-sm font-bold text-muted-foreground transition hover:bg-muted">
							<span className="flex items-center gap-3">
								<FolderKanban size={19} />
								Projects
							</span>
						</button> */}

						{/* <button className="flex h-12 w-full items-center justify-between rounded-lg px-3 text-sm font-bold text-muted-foreground transition hover:bg-muted">
							<span className="flex items-center gap-3">
								<GalleryHorizontalEnd size={19} />
								Media
							</span>
						</button> */}
					</nav>

					<div className="mt-8 border-t border-border pt-6">
						<p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
							Spaces
						</p>

						<div className="mt-4 space-y-3 text-sm font-semibold">
							<button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-foreground hover:bg-muted">
								Personal
							</button>

							<button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-foreground hover:bg-muted">
								Groups
							</button>

							<button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-foreground hover:bg-muted">
								Settings
							</button>
						</div>
					</div>
				</aside>

				<div className="flex min-w-1 flex-col">
					<header className="sticky top-0 z-20 border-b border-border bg-background/82 px-4 py-3 backdrop-blur-xl sm:px-6">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-card lg:hidden">
								<Sparkles size={20} />
							</div>

							<label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-lg border border-border bg-card/76 px-3 text-sm shadow-sm">
								<Search size={18} className="shrink-0 text-muted-foreground" />

								<input
									type="text"
									placeholder="Search anything..."
									className="min-w-0 flex-1 bg-transparent font-semibold outline-none placeholder:text-muted-foreground"
								/>
							</label>

							<button
								className="hidden h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-background shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 sm:flex "
								onClick={() => {
									router.push("/post");
								}}
							>
								<Plus size={18} />
								New post
							</button>

							<div className="relative" ref={notificationRef}>
								<button
									className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card/76 shadow-sm"
									onClick={() => {
										setNotificationActive((current) => !current);
									}}
								>
									<Bell size={19} />
								</button>

								{NotificationActive && (
									<div className="absolute right-0 top-full mt-3 flex flex-col min-w-80 bg-card/97 border border-border p-3 rounded-2xl shadow-xl z-50 min-h-70 max-h-100 animate-[PopIn_0.08s_ease-out]">
										<div className="flex flex-row justify-between border-b border-border pb-3">
											<section className={fonts.exo2.className}>
												Notification
											</section>

											<section>
												<Bell size={20} />
											</section>
										</div>

										<div
											className={`mt-8 opacity-50 w-full flex flex-row justify-center ${fonts.inconsolata.className} tracking-wide`}
										>
											Nothing more to view
										</div>
									</div>
								)}
							</div>

							<ThemeToggle />
						</div>
					</header>

					{children}
				</div>
			</section>
		</main>
	);
}
