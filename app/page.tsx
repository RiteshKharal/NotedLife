"use client";
import {
	Bell,
	BookOpenText,
	ChevronRight,
	Compass,
	FolderKanban,
	GalleryHorizontalEnd,
	Laugh,
	MessageCircle,
	Plus,
	Search,
	Send,
	SendHorizonal,
	Sparkles,
	ThumbsUp,
	User,
	X,
} from "lucide-react";
import Image from "next/image";
import * as fonts from "./fonts";

import { ThemeToggle } from "./components/ThemeToggle";
import { useEffect, useRef, useState } from "react";
import { useSettleExit } from "./hooks/useSettleExit";
import { Comme } from "next/font/google";

export default function Home() {
	const [NotificationActive, setNotificationActive] = useState<boolean>(false);
	const notificationRef = useRef<HTMLDivElement | null>(null);
	const [CommentsBoard, setCommentsBoards] = useState<null | boolean>(null);

	useSettleExit(notificationRef, () => {
		setNotificationActive(false);
	});

	return (
		<main className="min-h-screen overflow-hidden w-full bg-background text-foreground">
			<section className="mx-auto grid min-h-screen w-full max-w-full grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] bg-[radial-gradient(circle_at_0px_0px,hsl(var(--primary)_/0.14),transparent_60%)]">
				<aside className="hidden border-border border-r bg-card/70 py-6 backdrop-blur-xl lg:block sticky top-0 px-7">
					<div className="flex items-center gap-3">
						{/* <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-card shadow-lg shadow-primary/20">
							<NotebookPenIcon size={22} className="-rotate-20" />
						</div> */}
						<div>
							<p className="text-lg font-black leading-none tracking-widest mt-4">
								NotedLife
							</p>
						</div>
					</div>

					<nav className="mt-7 space-y-2">
						<button className="flex h-12 w-full items-center justify-between rounded-lg bg-primary px-3 text-sm font-bold text-card shadow-lg shadow-primary/20 transition">
							<span className="flex items-center gap-3">
								<Compass size={19} />
								Today
							</span>

							<ChevronRight size={17} />
						</button>

						<button className="flex h-12 w-full items-center justify-between rounded-lg px-3 text-sm font-bold text-muted-foreground transition hover:bg-muted">
							<span className="flex items-center gap-3">
								<BookOpenText size={19} />
								Library
							</span>
						</button>

						<button className="flex h-12 w-full items-center justify-between rounded-lg px-3 text-sm font-bold text-muted-foreground transition hover:bg-muted">
							<span className="flex items-center gap-3">
								<FolderKanban size={19} />
								Projects
							</span>
						</button>

						<button className="flex h-12 w-full items-center justify-between rounded-lg px-3 text-sm font-bold text-muted-foreground transition hover:bg-muted">
							<span className="flex items-center gap-3">
								<GalleryHorizontalEnd size={19} />
								Media
							</span>
						</button>
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

							<button className="hidden h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-background shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 sm:flex">
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
											<section className={`${fonts.exo2.className}`}>
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

					<section className="flex w-full flex-1 justify-center px-4 py-6 flex-col gap-7 items-center ">
						{CommentsBoard && (
							<section className="fixed z-50 flex w-full h-full items-center justify-center">
								<div className="relative flex flex-col w-125 max-w-[95vw] h-130 rounded-2xl border border-border bg-card/90 shadow-xl animate-[PopIn_120ms_ease-out] overflow-hidden backdrop-blur-lg">
									<div className="flex items-center justify-between border-b border-border px-4 py-3">
										<span className={fonts.cabin.className}>Comments</span>

										<button
											onClick={() => setCommentsBoards(null)}
											className="p-1 rounded-md hover:bg-muted transition"
										>
											<X size={18} />
										</button>
									</div>

									<div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
										No comments yet.
									</div>

									<div className="border-t border-border p-3">
										<div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
											<input
												type="text"
												placeholder="Write a comment..."
												className={`flex-1 bg-transparent outline-none text-sm ${fonts.cabin.className}`}
											/>
											<button>
												<SendHorizonal size={18}/>
											</button>
											<button className="text-muted-foreground hover:text-foreground transition">
												<Laugh size={18} />
											</button>
										</div>
									</div>
								</div>
							</section>
						)}

						<section className="w-full max-w-210  overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-lg shadow-foreground/2 transition hover:shadow-xl">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-11 w-11 items-center justify-center rounded-full bg-card2 text-foreground">
										<User size={20} />
									</div>

									<div className="flex flex-col items-start leading-tight">
										<h2 className="text-sm font-semibold tracking-tight">
											Guest
										</h2>

										<p className="text-xs text-foreground/60">2 hours ago</p>
									</div>
								</div>

								<button className="rounded-full p-2 transition hover:bg-muted">
									•••
								</button>
							</div>

							<div className="mt-4 flex flex-col items-start text-left">
								<p className="text-[15px] font-medium leading-relaxed text-foreground/90">
									worshsflh 📸
								</p>
							</div>

							<div className="grid grid-cols-[2fr_1fr] max-w-200 rounded-2xl overflow-hidden mt-4 h-100">
								<div className=" overflow-hidden  border border-border">
									<Image
										src="/ishowspeed.jpg"
										alt="Post image"
										width={900}
										height={900}
										className="h-auto max-h-125 w-full object-cover transition duration-300 hover:scale-[1.015] pointer-events-none"
										loading="eager"
									/>
								</div>

								<div className="overflow-hidden grid grid-rows-2 border-border">
									<div className=" overflow-hidden border border-border">
										<Image
											src="/ishowspeed.jpg"
											alt="Post image"
											width={900}
											height={900}
											className="h-auto max-h-125 w-full object-cover transition duration-300 hover:scale-[1.015] pointer-events-none"
											loading="eager"
										/>
									</div>
									<div className=" overflow-hidden border border-border">
										<Image
											src="/ishowspeed.jpg"
											alt="Post image"
											width={900}
											height={900}
											className="h-auto max-h-125 w-full object-cover transition duration-300 hover:scale-[1.015] pointer-events-none"
											loading="eager"
										/>
									</div>
								</div>
							</div>

							<div className="mt-4 flex items-center justify-between border-t border-border pt-3">
								<button className="flex flex-1 flex-row gap-2 items-center justify-center rounded-xl py-2 text-sm font-medium transition hover:bg-muted">
									<ThumbsUp size={20} /> Like
								</button>

								<button
									className="flex flex-1 flex-row gap-2 items-center justify-center rounded-xl py-2 text-sm font-medium transition hover:bg-muted"
									onClick={() => {
										setCommentsBoards(true);
									}}
								>
									<MessageCircle size={20} /> Comment
								</button>

								<button className="flex flex-1 flex-row gap-2 items-center justify-center rounded-xl py-2 text-sm font-medium transition hover:bg-muted">
									<Send size={20} /> Share
								</button>
							</div>
						</section>
					</section>
				</div>
			</section>
		</main>
	);
}
